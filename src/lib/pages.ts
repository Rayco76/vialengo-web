import { cases } from '../content/cases';
import { verticalPages } from '../content/verticals';

// Páginas públicas indexables: alimentan sitemap.xml y llms.txt.
// /tools y /resources existen pero no están aquí a propósito (todavía sin contenido propio).
// /privacidad y /aviso-legal tampoco: llevan noindex para que el NIF y el domicilio del
// titular no aparezcan en buscadores; siguen enlazadas desde el pie, como exige la LSSI.
export type PageEntry = { path: string; title: string; description: string };

export const pages: PageEntry[] = [
  { path: '/', title: 'Vialengo', description: 'Qué hace Vialengo y para quién.' },
  { path: '/services/', title: 'Servicios', description: 'Presencia digital, redes, WhatsApp, citas, reputación y automatización.' },
  { path: '/ai/', title: 'Vialengo para IA', description: 'Descripción estructurada y factual de Vialengo para personas y sistemas automáticos.' },
  { path: '/cases/', title: 'Casos', description: 'Estado del primer proyecto, sin resultados publicados todavía.' },
  ...verticalPages.map((v) => ({ path: `/sectores/${v.slug}/`, title: v.name, description: v.summary })),
  ...cases.map((c) => ({ path: `/cases/${c.slug}/`, title: c.title, description: c.summary })),
];
