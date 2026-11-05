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
- `/privacidad` y `/aviso-legal` llevan `noindex` y no están en sitemap ni llms.txt (muestran NIF y domicilio del titular); siguen enlazadas desde el pie.

## Variables de entorno

Ver `.env.example`. Todas son públicas (`PUBLIC_*`): `PUBLIC_SITE_URL`, `PUBLIC_BASE_PATH`,
`PUBLIC_AUDIT_FORM_ENDPOINT`, `PUBLIC_TURNSTILE_SITE_KEY`.

## Formulario de auditoría

Estados: `idle`, `loading`, `success`, `error`, validación por campo, casilla de privacidad,
campo trampa (honeypot) y Turnstile opcional.

- **Producción** (`npm run build`): el formulario solo se muestra si hay `PUBLIC_AUDIT_FORM_ENDPOINT`
  **y** los datos legales de `site.ts` están completos. Si no, se muestra un aviso de "no activo".
  Nunca se simula un envío en producción.
- **Desarrollo** (`npm run dev`) sin endpoint: modo simulado, con aviso visible; valida pero no envía.
- Receptor: Worker de Cloudflare en `worker/` (Turnstile + envío por Brevo a `hola@vialengo.com`).
  Puesta en marcha en [worker/README.md](worker/README.md).
- Contrato: `POST` con `FormData` (`name`, `business`, `email`, `phone`, `website`, `message`, `privacy`,
  y `cf-turnstile-response` si hay Turnstile) y cabecera `Accept: application/json`; cualquier 2xx es éxito.

## Despliegue en GitHub Pages

1. `PUBLIC_SITE_URL` = origen (p. ej. `https://vialengo.com` o `https://usuario.github.io`).
2. Sin dominio propio, en subruta: `PUBLIC_BASE_PATH=/nombre-del-repo`. Con dominio propio, vacío.
3. Publicar el contenido de `dist/` (`public/.nojekyll` evita que Jekyll ignore `_astro/`).
4. Con dominio propio, `public/CNAME` contiene el dominio (`vialengo.com`).
5. El workflow `.github/workflows/deploy.yml` compila y publica en cada push a `main`. Las variables `PUBLIC_*` se definen en Settings → Secrets and variables → Actions → Variables (si `PUBLIC_SITE_URL` no existe, se usa `https://vialengo.com`).

## Repaso de posicionamiento — noviembre de 2026

La portada presenta Vialengo como un servicio que se encarga de la parte digital del
negocio: web y mantenimiento, redes, Google y reputación, WhatsApp, citas y soluciones
a medida. Los servicios aparecen tras la cabecera; las capturas de WhatsApp se muestran
más abajo como un ejemplo concreto. Se conserva la identidad visual y los enlaces
existentes (incluido #auditoria).

El alcance, la frecuencia, el material aportado y las aprobaciones se acuerdan con cada
negocio. No se promete publicación automática, conexión universal con agendas ni
resultados garantizados. Google Business se actualiza manualmente; los desarrollos
a medida se estudian y presupuestan antes. Los datos compartidos en src/content/
y siteConfig.description alimentan Servicios, FAQ, Markdown, llms.txt y JSON-LD.

Validación: ejecutar npm run build y revisar la portada y Servicios en ordenador y
móvil. El formulario conserva sus modos y sigue desactivado en producción mientras
falten el endpoint o los datos legales del titular.

## Confianza y caso piloto

La home incorpora la forma de trabajar y una presentación de Rayco Rivero González. El caso
piloto conserva `/cases/dental-clinic-001/` y presenta proceso, galería pendiente y
primeras señales de alcance con contexto. Ver [Contenido y autorizaciones](docs/contenido-y-autorizaciones.md)
para sustituir la foto, añadir capturas reales y revisar la procedencia de las métricas.

## Política de privacidad

`/privacidad/` contiene los 14 apartados del documento de
`../ClinicOS_Work/Legal/POLITICA_DE_PRIVACIDAD.md`, actualizado el 5 de noviembre
de 2026. Los datos identificativos y el correo para ejercer derechos proceden de
`src/config/site.ts`. Mantener el texto de la página y el documento de trabajo
sincronizados cuando cambie la política. El aviso legal incluye las condiciones generales de uso del sitio.

Los datos legales están configurados. El formulario se activa en producción al definir
`PUBLIC_AUDIT_FORM_ENDPOINT` con la URL del Worker de `worker/`. Cloudflare y Brevo
figuran como proveedores en el apartado 6 de la política.

El correo único para contacto comercial, clientes y privacidad es
`hola@vialengo.com`, definido una sola vez en `src/config/site.ts`. No se toma de
variables de entorno para evitar diferencias entre los datos legales y el contacto.
Se muestra también en el pie de todas las páginas y en las versiones Markdown y
los datos estructurados que consumen la configuración central.

Las consultas sin contratación se conservan como máximo 12 meses desde el último
contacto. Es un procedimiento de gestión del buzón; no existe un borrado automático
implementado ni se aplica ese plazo de forma general a los datos de pacientes.
Los proveedores y verificaciones pendientes están en
`../ClinicOS_Work/Legal/README.md`.
