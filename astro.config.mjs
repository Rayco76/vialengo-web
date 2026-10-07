import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

// Las variables PUBLIC_* se leen aquí además de en el código del sitio para que
// el dominio y la subruta se configuren en un único sitio (.env o entorno de CI).
const env = { ...loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), ''), ...process.env };

export default defineConfig({
  // Sitio 100 % estático: se puede servir desde GitHub Pages o cualquier hosting estático.
  output: 'static',
  trailingSlash: 'always',
  site: env.PUBLIC_SITE_URL || 'https://vialengo.com',
  // Solo hace falta si se sirve desde una subruta (p. ej. https://usuario.github.io/repositorio).
  // Con dominio propio déjalo vacío.
  base: env.PUBLIC_BASE_PATH || '/',
});
