import type { APIRoute } from 'astro';
import { pages } from '../lib/pages';
import { absoluteUrl } from '../lib/url';

export const GET: APIRoute = () => {
  const urls = pages.map((page) => `<url><loc>${absoluteUrl(page.path)}</loc></url>`).join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
