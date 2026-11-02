// Casos de cliente: sin nombres ni datos identificables no autorizados.
// Las primeras señales del piloto las facilita el responsable del proyecto.
export type CaseMetric = { value: string; label: string };
export type CaseGalleryItem = {
  title: string;
  caption: string;
  // CAPTURA REAL: guardar el archivo aprobado en public/cases/ y asignar su ruta.
  // null mantiene el placeholder "Próximamente". No usar material ficticio.
  src: string | null;
  alt: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  status: 'in-progress' | 'published';
  summary: string;
  scope: string[];
  metrics: CaseMetric[];
  headline?: string;
  initialSituation?: string;
  gallery?: CaseGalleryItem[];
  initialSignals?: { summary: string; source: string; note: string };
  nextSteps?: string;
  publicationNote?: string;
};

export const cases: CaseStudy[] = [
  {
    // Se conserva la URL existente para no romper enlaces.
    slug: 'dental-clinic-001',
    title: 'Clínica dental local · Caso piloto',
    sector: 'Clínicas dentales',
    status: 'in-progress',
    headline: 'De presencia dispersa a sistema digital coherente',
    summary: 'Caso piloto de una clínica dental local: identidad visual, perfiles, contenido y bases para una atención digital más ordenada.',
    initialSituation: 'Presencia digital con margen de mejora: perfiles poco activos, comunicación visual sin un sistema común y poco contenido que reflejase el trato de la clínica.',
    scope: [
      'Unificación de estilo visual y plantillas.',
      'Optimización de perfiles sociales.',
      'Calendario de contenidos educativos y locales.',
      'Reels y publicaciones adaptadas a la zona.',
      'Materiales QR para facilitar el seguimiento de perfiles.',
      'Preparación progresiva de automatización de atención.',
    ],
    // Sin pacientes captados, ingresos ni resultados económicos atribuidos.
    metrics: [],
    gallery: [
      { title: 'Perfiles de Facebook e Instagram', caption: 'Capturas de los perfiles y su presentación visual.', src: null, alt: 'Perfil social de la clínica piloto con una presentación visual unificada' },
      { title: 'Publicaciones y reels', caption: 'Ejemplos de contenido educativo y adaptado a la zona.', src: null, alt: 'Ejemplo aprobado de una publicación o reel de la clínica piloto' },
      { title: 'Branding y plantillas', caption: 'El estilo común que da continuidad a la comunicación.', src: null, alt: 'Plantillas y estilo visual utilizados en el caso piloto' },
      { title: 'Web', caption: 'Se incorporará cuando exista y esté aprobada para mostrar.', src: null, alt: 'Web de la clínica piloto, cuando esté disponible' },
    ],
    initialSignals: {
      summary: 'Una publicación compartida en grupos locales alcanzó aproximadamente 500 visualizaciones, 22 interacciones y una visita al perfil.',
      source: 'Datos iniciales facilitados por el responsable del proyecto.',
      note: 'Son señales iniciales de alcance e interacción, no una atribución de pacientes ni una promesa de resultados.',
    },
    nextSteps: 'Seguir midiendo qué contenidos atraen interés local, facilitar el contacto y convertir la presencia digital en un sistema de captación y atención más completo.',
    publicationNote: 'Los materiales, capturas y métricas publicados se muestran con autorización de la clínica o de forma anonimizada.',
  },
];

export const featuredCase = cases[0];
