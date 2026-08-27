import type { APIRoute } from 'astro';
import { futureRoutes, siteConfig } from '../config/site';

export const GET: APIRoute = () => {
  const routes = ['/', ...futureRoutes];
  const urls = routes.map((route) => `<url><loc>${new URL(route, siteConfig.url)}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
};
