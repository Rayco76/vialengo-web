import type { APIRoute } from 'astro';
import { servicesMarkdown } from '../lib/markdown';

export const GET: APIRoute = () =>
  new Response(servicesMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
