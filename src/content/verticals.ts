// Sectores (verticales). Dental es el primero; el resto están preparados pero sin página.
// Para publicar la página de un sector: `page: true` y rellenar `useCases`.
// Se genera sola en /sectores/<slug>/ y entra en sitemap y llms.txt.

export type Vertical = {
  slug: string;
  name: string;
  status: 'active' | 'planned';
  page: boolean;
  summary: string;
  useCases?: string[];
  note?: string;
};

export const verticals: Vertical[] = [
  {
    slug: 'dental',
    name: 'Clínicas dentales',
    status: 'active',
    page: true,
    summary:
      'El primer sector en el que trabajamos. Hay un primer proyecto en implementación en una clínica dental.',
    useCases: [
      'Solicitudes de cita por WhatsApp, también fuera del horario de recepción.',
      'Información básica de la clínica: horario, ubicación y servicios.',
      'Ante una urgencia, el asistente remite a la clínica o a los servicios de emergencias; no da consejos clínicos ni diagnósticos.',
      'Recepción continúa la conversación desde una bandeja compartida y propone el horario de la cita.',
      'Seguimiento de reseñas de Google y borradores de respuesta revisados por una persona.',
      'Calendario mensual de contenidos para redes, con borradores que revisa una persona antes de publicar.',
    ],
    note: 'La conexión con el software de gestión de la clínica se valora caso por caso.',
  },
  {
    slug: 'fisioterapia',
    name: 'Fisioterapia',
    status: 'planned',
    page: false,
    summary: 'Centros con citas recurrentes y seguimiento de pacientes.',
  },
  {
    slug: 'clinicas-sanitarias',
    name: 'Clínicas sanitarias',
    status: 'planned',
    page: false,
    summary: 'Consultas y clínicas privadas con agenda y atención por WhatsApp.',
  },
  {
    slug: 'estetica',
    name: 'Centros de estética',
    status: 'planned',
    page: false,
    summary: 'Centros con reservas, recordatorios y mucha presencia en redes.',
  },
  {
    slug: 'otros-negocios-con-agenda',
    name: 'Otros negocios locales con agenda',
    status: 'planned',
    page: false,
    summary: 'Cualquier negocio de cita previa que quiera atender mejor y captar más.',
  },
];

export const verticalPages = verticals.filter((v) => v.page);
