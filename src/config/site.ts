// Configuración central del sitio. Todo dato de marca, dominio, contacto y legal
// vive aquí; los componentes no deben repetirlo.
//
// Los valores `null` son datos que TODAVÍA NO conocemos. No inventes valores:
// rellénalos cuando el titular los confirme. Mientras falten, el sitio lo indica
// (páginas legales marcadas como borrador y formulario desactivado en producción).

const env = import.meta.env;
const contactEmail = 'hola@vialengo.com';

const origin = String(env.PUBLIC_SITE_URL || 'https://vialengo.com').replace(/\/+$/, '');

export const siteConfig = {
  name: 'Vialengo',
  tagline: 'Nos encargamos de la parte digital de tu negocio',
  description:
    'Vialengo se encarga de la parte digital de tu negocio: web, redes sociales, Google Business, reseñas, WhatsApp y citas. Un servicio cercano, con mantenimiento y soluciones a medida.',
  locale: 'es-ES',
  lang: 'es',
  country: { code: 'ES', name: 'España' },
  // Dominio público sin barra final.
  origin,

  contact: {
    // Un único buzón para consultas, clientes y privacidad.
    email: contactEmail,
    // Solo si se quiere publicar un teléfono. No se muestra mientras sea null.
    phone: null as string | null,
  },

  // PENDIENTE: perfiles oficiales. Ejemplo: { name: 'LinkedIn', url: 'https://…' }.
  // Se publican como `sameAs` en los datos estructurados solo si hay alguno.
  social: [] as { name: string; url: string }[],

  // Datos del titular para Aviso legal y Política de privacidad (LSSI-CE y RGPD).
  // Datos confirmados en ClinicOS_Work/Legal. `complete` se calcula solo.
  legal: {
    holderName: "Rayco Rivero Gonzalez" as string | null, // nombre o razón social
    taxId: "45725450R" as string | null, // NIF/CIF
    address: "Avenida Independencia 45, 28701 San Sebastián de los Reyes, Madrid" as string | null, // domicilio
    registry: null as string | null, // datos registrales, si es sociedad
    contactEmail, // email para ejercer derechos RGPD
  },

  // Formulario de auditoría (endpoint externo; el sitio no tiene backend).
  form: {
    endpoint: (env.PUBLIC_AUDIT_FORM_ENDPOINT as string | undefined) || '',
    turnstileSiteKey: (env.PUBLIC_TURNSTILE_SITE_KEY as string | undefined) || '',
  },
};

const requiredLegal = [
  siteConfig.legal.holderName,
  siteConfig.legal.taxId,
  siteConfig.legal.address,
  siteConfig.legal.contactEmail,
];
export const legalComplete = requiredLegal.every(Boolean);

/**
 * Estado del formulario según el entorno:
 * - `live`: producción con endpoint y datos legales completos.
 * - `dev-mock`: solo en `npm run dev` y sin endpoint; no envía nada y lo dice.
 * - `disabled`: cualquier otro caso. No se muestra el formulario ni se simula un envío.
 */
export type FormMode = 'live' | 'dev-mock' | 'disabled';
export function getFormMode(): FormMode {
  const { endpoint } = siteConfig.form;
  if (env.DEV) return endpoint ? 'live' : 'dev-mock';
  return endpoint && legalComplete ? 'live' : 'disabled';
}

export const navLinks = [
  { label: 'Servicios', path: '/services/' },
  { label: 'Sectores', path: '/#sectores' },
  { label: 'Cómo funciona', path: '/#como-funciona' },
  { label: 'Casos', path: '/cases/' },
  { label: 'FAQ', path: '/#faq' },
] as const;
