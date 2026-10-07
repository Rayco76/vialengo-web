# Vialengo — sitio web

Sitio estático en Astro (sin backend, sin framework JS). Compatible con GitHub Pages.

Marca y estilo: ver `../ClinicOS_Work/Branding/` (tokens en `src/styles/global.css`, iconos Lucide vía `src/components/Icon.astro`).

## Comandos

```bash
npm ci            # instalar (respeta el lockfile; si node_modules viene de otro SO, bórralo antes)
npm run dev       # desarrollo en http://localhost:4321
npm run build     # astro check + build estático en dist/
npm run preview   # sirve dist/
```

No hay tests automatizados; `npm run build` ejecuta `astro check` (tipos y plantillas).

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Marca, dominio, contacto, datos legales, modo del formulario | `src/config/site.ts` (único sitio) |
| Servicios, sectores, casos, FAQ, integraciones, proceso | `src/content/*.ts` |
| Páginas de sector y de caso | se generan solas desde `verticals.ts` (`page: true`) y `cases.ts` |
| sitemap, robots, llms.txt, versiones Markdown | `src/pages/*.ts` (usan los mismos datos que el HTML) |
| JSON-LD (Organization, WebSite, WebPage, Service, FAQPage) | `src/lib/jsonld.ts`, montado en `BaseLayout.astro` |

- **Nuevo sector**: añadir objeto en `verticals.ts`; con `page: true` y `useCases` aparece en `/sectores/<slug>/`, sitemap y llms.txt.
- **Nuevo caso**: añadir objeto en `cases.ts`; `/cases/<slug>/`. Rellenar `metrics` solo con datos verificados.
- **Nuevo servicio**: añadir en `solutions.ts`; aparece en Home, /services, /ai, llms.txt y JSON-LD.
- `/tools` y `/resources` existen pero están fuera de navegación, sitemap y llms.txt, y con `noindex`.

## Variables de entorno

Ver `.env.example`. Todas son públicas (`PUBLIC_*`): `PUBLIC_SITE_URL`, `PUBLIC_BASE_PATH`,
`PUBLIC_CONTACT_EMAIL`, `PUBLIC_AUDIT_FORM_ENDPOINT`, `PUBLIC_TURNSTILE_SITE_KEY`.

## Formulario de auditoría

Estados: `idle`, `loading`, `success`, `error`, validación por campo, casilla de privacidad,
campo trampa (honeypot) y Turnstile opcional.

- **Producción** (`npm run build`): el formulario solo se muestra si hay `PUBLIC_AUDIT_FORM_ENDPOINT`
  **y** los datos legales de `site.ts` están completos. Si no, se muestra un aviso de "no activo".
  Nunca se simula un envío en producción.
- **Desarrollo** (`npm run dev`) sin endpoint: modo simulado, con aviso visible; valida pero no envía.
- Contrato: `POST` con `FormData` (`name`, `business`, `email`, `phone`, `website`, `message`, `privacy`,
  y `cf-turnstile-response` si hay Turnstile) y cabecera `Accept: application/json`; cualquier 2xx es éxito.

## Despliegue en GitHub Pages

1. `PUBLIC_SITE_URL` = origen (p. ej. `https://vialengo.com` o `https://usuario.github.io`).
2. Sin dominio propio, en subruta: `PUBLIC_BASE_PATH=/nombre-del-repo`. Con dominio propio, vacío.
3. Publicar el contenido de `dist/` (`public/.nojekyll` evita que Jekyll ignore `_astro/`).
4. Con dominio propio, añadir `public/CNAME` con el dominio.
