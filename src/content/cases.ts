// Casos de cliente. Solo datos verificados: no inventes cifras ni nombres.
// Para añadir un caso: nuevo objeto aquí; se publica solo en /cases/<slug>/.
// Cuando haya resultados reales, rellena `metrics` (aparecen en la Home y en el caso).

export type CaseMetric = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  status: 'in-progress' | 'published';
  summary: string;
  /** Qué se está implantando; sin datos del cliente. */
  scope: string[];
  metrics: CaseMetric[];
};

export const cases: CaseStudy[] = [
  {
    slug: 'dental-clinic-001',
    title: 'Clínica dental · primer proyecto',
    sector: 'Clínicas dentales',
    status: 'in-progress',
    summary:
      'Estamos implantando Vialengo en una clínica dental real. Medimos conversaciones, solicitudes de cita, actividad fuera de horario y conversión.',
    scope: [
      'Asistente de WhatsApp para consultas y solicitudes de cita.',
      'Bandeja compartida para que recepción continúe las conversaciones.',
      'Modo asistido: recepción propone el horario y registra la cita.',
      'Seguimiento de reseñas y borradores de respuesta.',
    ],
    metrics: [],
  },
];

export const featuredCase = cases[0];
