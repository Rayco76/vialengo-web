# Worker del formulario de contacto

Recibe el formulario de vialengo.com, comprueba el antispam (Cloudflare Turnstile) y
envía la consulta por email a `hola@vialengo.com` a través de Brevo. No guarda las
consultas ni registra datos personales. Al pulsar «Responder» en el correo se contesta
directamente al visitante.

```
Formulario (vialengo.com) → Worker (Cloudflare) → Brevo → hola@vialengo.com (DonDominio)
```

El dominio y el correo siguen en DonDominio; no hace falta mover nada a Cloudflare.

## Puesta en marcha (una sola vez)

### 1. Brevo

1. **Remitente**: en *Remitentes, dominios e IP dedicadas → Dominios*, autentica el
   subdominio `avisos.vialengo.com` (configuración manual) y copia en la zona DNS de
   `vialengo.com` en DonDominio los registros que indique Brevo (verificación, DKIM,
   DMARC…). En el campo «Nombre» de DonDominio va solo la parte anterior a
   `.vialengo.com`. Los avisos salen de `web@avisos.vialengo.com`, que no necesita buzón;
   el correo de `hola@vialengo.com` no se toca.
2. **Clave API**: en *SMTP y API → Claves API*, crea una clave (por ejemplo «vialengo-form»).
   Guárdala; solo se muestra una vez.

### 2. Cloudflare Turnstile

En el panel de Cloudflare: *Turnstile → Añadir widget*.

- Nombre: `vialengo.com`
- Dominios: `vialengo.com`, `www.vialengo.com` (y `localhost` si quieres probar en local)
- Modo: *Gestionado*

Te da una **clave del sitio** (pública) y una **clave secreta**.

### 3. Desplegar el Worker

Desde esta carpeta (`worker/`):

```bash
npx wrangler@4 login
npx wrangler@4 deploy
npx wrangler@4 secret put BREVO_API_KEY
npx wrangler@4 secret put TURNSTILE_SECRET
```

`deploy` muestra la URL del Worker, del tipo `https://vialengo-form.<tu-subdominio>.workers.dev`.

### 4. Conectar la web

En GitHub: *Settings → Secrets and variables → Actions → Variables*:

- `PUBLIC_AUDIT_FORM_ENDPOINT` = URL del Worker
- `PUBLIC_TURNSTILE_SITE_KEY` = clave del sitio de Turnstile

Vuelve a lanzar el workflow *Deploy to GitHub Pages* (o haz un push a `main`).
Prueba el formulario en vialengo.com y comprueba que llega el correo.

## Configuración

| Qué | Dónde |
|---|---|
| Orígenes permitidos, destinatario y remitente | `[vars]` de `wrangler.toml` |
| `BREVO_API_KEY`, `TURNSTILE_SECRET` | secretos del Worker (`wrangler secret put`) |

Si cambias el remitente (`SENDER_EMAIL`), su dominio tiene que estar autenticado en Brevo.

## Probar en local

Crea `worker/.dev.vars` (no se sube al repositorio) con las claves de prueba de Turnstile:

```
ALLOWED_ORIGINS=http://localhost:4321
BREVO_API_KEY=tu-clave
TURNSTILE_SECRET=1x0000000000000000000000000000000AA
```

Ejecuta `npx wrangler@4 dev` y, en la web, crea un `.env` con
`PUBLIC_AUDIT_FORM_ENDPOINT=http://localhost:8787` y
`PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA`. Con esas claves de prueba Turnstile
siempre aprueba, pero Brevo envía de verdad.

## Respuestas

| Código | Motivo |
|---|---|
| 200 | Enviado (o trampa antispam activada, sin enviar nada) |
| 400 | Campos obligatorios vacíos, email no válido, privacidad sin aceptar o texto demasiado largo |
| 403 | Origen no permitido o verificación de Turnstile fallida |
| 500 | Faltan secretos o variables del Worker |
| 502 | Turnstile o Brevo no responden |
