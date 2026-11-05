// Worker de Cloudflare que recibe el formulario de vialengo.com y lo envía por email
// a través de Brevo. No guarda las consultas en ningún sitio ni registra datos personales.
//
// Contrato (ver src/components/AuditForm.astro):
//   POST FormData: name, business, email, phone, website, message, privacy,
//   _gotcha (trampa anti-spam) y cf-turnstile-response.
//   Respuesta JSON { ok: true } con 2xx si se ha enviado; { ok: false, error } si no.
//
// Variables (wrangler.toml): ALLOWED_ORIGINS, TO_EMAIL, SENDER_EMAIL, SENDER_NAME.
// Secretos (wrangler secret put): BREVO_API_KEY, TURNSTILE_SECRET.

const LIMITS = { name: 100, business: 150, email: 254, phone: 40, website: 300, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request, env) {
    const allowed = String(env.ALLOWED_ORIGINS || '').split(',').map((o) => o.trim()).filter(Boolean);
    const origin = request.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0] || '',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept, Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };
    const reply = (status, body) =>
      new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json; charset=utf-8' } });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return reply(405, { ok: false, error: 'method_not_allowed' });
    if (!allowed.includes(origin)) return reply(403, { ok: false, error: 'origin_not_allowed' });
    if (!env.BREVO_API_KEY || !env.TURNSTILE_SECRET || !env.TO_EMAIL || !env.SENDER_EMAIL) {
      return reply(500, { ok: false, error: 'not_configured' });
    }

    let form;
    try {
      form = await request.formData();
    } catch {
      return reply(400, { ok: false, error: 'invalid_body' });
    }
    const field = (key) => String(form.get(key) ?? '').trim();

    // Trampa anti-spam: si un bot rellena el campo oculto, fingimos éxito y no enviamos nada.
    if (field('_gotcha')) return reply(200, { ok: true });

    const data = Object.fromEntries(Object.keys(LIMITS).map((key) => [key, field(key)]));
    const tooLong = Object.entries(LIMITS).some(([key, max]) => data[key].length > max);
    if (!data.name || !data.business || !EMAIL_RE.test(data.email) || form.get('privacy') !== 'on' || tooLong) {
      return reply(400, { ok: false, error: 'invalid_fields' });
    }

    // Verificación de Cloudflare Turnstile.
    const token = field('cf-turnstile-response');
    if (!token) return reply(403, { ok: false, error: 'turnstile_missing' });
    const check = new FormData();
    check.append('secret', env.TURNSTILE_SECRET);
    check.append('response', token);
    const ip = request.headers.get('CF-Connecting-IP');
    if (ip) check.append('remoteip', ip);
    try {
      const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: check });
      const result = await verify.json();
      if (!result.success) return reply(403, { ok: false, error: 'turnstile_failed' });
    } catch {
      return reply(502, { ok: false, error: 'turnstile_unavailable' });
    }

    // Envío del aviso por Brevo. "Responder" en el correo contesta directamente al visitante.
    const oneLine = (text) => text.replace(/[\r\n]+/g, ' ');
    const rows = [
      ['Nombre', data.name],
      ['Negocio', data.business],
      ['Email', data.email],
      ['Teléfono', data.phone || '—'],
      ['Web', data.website || '—'],
      ['Mensaje', data.message || '—'],
    ];
    const textContent = rows.map(([label, value]) => `${label}: ${value}`).join('\n') +
      '\n\nEl visitante ha aceptado la política de privacidad.';
    const htmlContent = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#10231b">
<h2 style="margin:0 0 16px">Nueva consulta desde vialengo.com</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([label, value]) => `<tr><td style="vertical-align:top;font-weight:bold">${label}</td><td style="white-space:pre-wrap">${escapeHtml(value)}</td></tr>`)
      .join('')}</table>
<p style="color:#607067;font-size:13px">El visitante ha aceptado la política de privacidad. Pulsa «Responder» para contestarle.</p>
</body></html>`;

    try {
      const sent = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          sender: { name: env.SENDER_NAME || 'Web Vialengo', email: env.SENDER_EMAIL },
          to: [{ email: env.TO_EMAIL }],
          replyTo: { email: data.email, name: oneLine(data.name) },
          subject: oneLine(`Nueva consulta web: ${data.business}`),
          textContent,
          htmlContent,
        }),
      });
      if (!sent.ok) return reply(502, { ok: false, error: 'send_failed' });
    } catch {
      return reply(502, { ok: false, error: 'send_failed' });
    }

    return reply(200, { ok: true });
  },
};

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
