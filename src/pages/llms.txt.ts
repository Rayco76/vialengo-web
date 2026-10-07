import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site';
import { solutions } from '../content/solutions';
import { verticalPages } from '../content/verticals';
import { cases } from '../content/cases';
import { absoluteUrl } from '../lib/url';
import { contactLine } from '../lib/markdown';

// Formato llms.txt: H1, resumen en cita, detalle y listas de enlaces por sección.
// Se genera con los mismos datos que el sitio; solo enlaza páginas que existen.
const link = (name: string, path: string, note: string) => `- [${name}](${absoluteUrl(path)}): ${note}`;

export const GET: APIRoute = () => {
  const body = `# ${siteConfig.name}

> ${siteConfig.description}

Servicio personalizado para negocios locales en ${siteConfig.country.name}, en remoto. Se adapta al sector, a las herramientas, a la agenda y al proceso de atención de cada negocio. Primer sector: clínicas dentales. No se publican precios. ${contactLine()}

## Main

${link('Vialengo', '/', 'qué hace Vialengo, para quién y cómo funciona')}
${link('Servicios', '/services/', 'detalle de cada servicio, integraciones y proceso')}
${link('Vialengo para IA', '/ai/', 'descripción estructurada y factual, con integraciones disponibles, dependientes y futuras')}

## Solutions

${solutions.map((s) => link(s.title, `/services/#${s.id}`, s.short)).join('\n')}
${verticalPages.map((v) => link(v.name, `/sectores/${v.slug}/`, v.summary)).join('\n')}

## Cases

${link('Casos', '/cases/', 'estado del primer proyecto; todavía sin resultados publicados')}
${cases.map((c) => link(c.title, `/cases/${c.slug}/`, c.summary)).join('\n')}

## Legal

${link('Política de privacidad', '/privacidad/', 'en preparación')}
${link('Aviso legal', '/aviso-legal/', 'en preparación')}

## Optional

${link('Home en Markdown', '/index.md', 'versión Markdown de la página principal')}
${link('Servicios en Markdown', '/services.md', 'versión Markdown de los servicios')}
${link('Vialengo para IA en Markdown', '/ai.md', 'versión Markdown de la página para IA')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
