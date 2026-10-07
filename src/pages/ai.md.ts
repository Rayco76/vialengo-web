import type { APIRoute } from 'astro';
import { aiMarkdown } from '../lib/markdown';

export const GET: APIRoute = () =>
  new Response(aiMarkdown(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
