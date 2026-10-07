import { siteConfig } from '../config/site';

// BASE_URL viene de `base` en astro.config.mjs ('/' o '/subruta/').
const base = import.meta.env.BASE_URL.replace(/\/+$/, '');

// Las páginas terminan en "/" (trailingSlash: 'always'); los ficheros con extensión no.
function normalize(path: string): string {
  const [pathname, hash = ''] = path.split('#');
  const withSlash = /\.[a-z0-9]+$/i.test(pathname) || pathname.endsWith('/') ? pathname : `${pathname}/`;
  return hash ? `${withSlash}#${hash}` : withSlash;
}

/** Enlace interno relativo al dominio, respetando la subruta si existe. */
export function href(path: string): string {
  return `${base}${normalize(path)}`;
}

/** URL absoluta para canonical, sitemap, llms.txt y datos estructurados. */
export function absoluteUrl(path: string): string {
  return `${siteConfig.origin}${href(path)}`;
}
