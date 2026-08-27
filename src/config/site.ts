export const siteConfig = {
  name: 'Clinic Growth OS',
  shortName: 'CGOS',
  tagline: 'Crecimiento y automatización para clínicas dentales',
  description:
    'Ayudamos a clínicas dentales a captar, convertir y retener más pacientes mediante WhatsApp, automatización, contenido y analítica.',
  email: '',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://clinic-growth-os.pages.dev',
  formEndpoint: import.meta.env.PUBLIC_AUDIT_FORM_ENDPOINT || '',
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '',
};

export const futureRoutes = ['/tools', '/services', '/cases', '/resources'] as const;
