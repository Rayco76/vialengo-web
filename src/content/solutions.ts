// Soluciones de Vialengo. Se usan en Home, /services, /ai, llms.txt, Markdown y JSON-LD.
// Para añadir una solución basta con añadirla aquí.

export type Solution = {
  id: string;
  /** Nombre de icono Lucide registrado en components/Icon.astro. */
  icon: 'MapPin' | 'Share2' | 'MessageCircle' | 'CalendarCheck' | 'Star' | 'Workflow';
  title: string;
  /** Una frase para tarjetas y listados. */
  short: string;
  /** Párrafo para /services y /ai. */
  summary: string;
  includes: string[];
  /** Limitaciones o dependencias; se muestran siempre que existan. */
  depends?: string;
};

export const solutions: Solution[] = [
  {
    id: 'presencia-digital',
    icon: 'MapPin',
    title: 'Presencia digital',
    short: 'Google Business Profile, web y posicionamiento local para que te encuentren cuando te buscan.',
    summary:
      'Revisamos y ordenamos cómo aparece tu negocio en Google y en tu web, para que quien te busca encuentre información clara y una forma fácil de contactar.',
    includes: [
      'Ficha de Google Business Profile completa y actualizada.',
      'Web sencilla, con la información útil y un camino claro para contactar.',
      'Posicionamiento local básico (SEO local).',
      'Revisión de cómo se ve el negocio en búsquedas y mapas.',
    ],
    depends:
      'Las posiciones en buscadores dependen de la competencia y de factores que no controlamos; no prometemos posiciones concretas.',
  },
  {
    id: 'redes-sociales',
    icon: 'Share2',
    title: 'Redes sociales',
    short: 'Planificación, creación asistida y gestión de contenido con tu material real.',
    summary:
      'Planificamos el contenido del mes y preparamos borradores a partir de lo que ya hace tu negocio, para mantener las redes activas sin que te lleve horas.',
    includes: [
      'Calendario mensual de contenidos.',
      'Borradores de publicaciones con ayuda de IA.',
      'Reutilización de material real del negocio: fotos, novedades, equipo.',
      'Tono adaptado a tu negocio y a tu sector.',
    ],
    depends: 'Nada se publica de forma automática: cada borrador lo revisa y publica una persona.',
  },
  {
    id: 'whatsapp-atencion',
    icon: 'MessageCircle',
    title: 'WhatsApp y atención',
    short: 'Respuestas a preguntas frecuentes, recogida de solicitudes y conversaciones ordenadas.',
    summary:
      'Un asistente de WhatsApp atiende las consultas habituales, recoge los datos de quien escribe y pasa la conversación a una persona del equipo cuando hace falta, también fuera de horario.',
    includes: [
      'Respuestas a preguntas frecuentes: horarios, ubicación, servicios.',
      'Recogida de solicitudes y datos de contacto.',
      'Atención fuera del horario del negocio.',
      'Bandeja compartida para que el equipo continúe la conversación.',
      'Aviso al negocio cuando una conversación necesita a una persona.',
    ],
    depends:
      'Requiere un número de WhatsApp Business conectado a la plataforma oficial de WhatsApp (Meta). El asistente sigue reglas definidas con cada negocio; no da consejos ni diagnósticos.',
  },
  {
    id: 'citas-agenda',
    icon: 'CalendarCheck',
    title: 'Citas y agenda',
    short: 'Solicitudes de cita y conexión con tu agenda o sistema actual cuando es posible.',
    summary:
      'Recogemos las solicitudes de cita por WhatsApp y las llevamos a tu forma de trabajar: o bien el equipo propone el horario, o bien se conecta con tu agenda cuando es técnicamente posible.',
    includes: [
      'Solicitudes de cita ordenadas, con los datos necesarios para gestionarlas.',
      'Modo asistido: el equipo propone el horario y confirma la cita.',
      'Consulta de disponibilidad y creación de citas en Google Calendar, para negocios que lo usan.',
      'Estudio de la conexión con otros programas de agenda o gestión.',
    ],
    depends:
      'La conexión con otros programas depende de que ofrezcan acceso técnico y de una valoración previa. No hay una integración universal: se estudia caso por caso.',
  },
  {
    id: 'reputacion',
    icon: 'Star',
    title: 'Reputación',
    short: 'Seguimiento de reseñas y borradores de respuesta que revisa una persona.',
    summary:
      'Seguimos las reseñas de Google de tu negocio y preparamos borradores de respuesta con tono cuidado, para que respondas con rapidez y criterio.',
    includes: [
      'Seguimiento de reseñas de Google.',
      'Borradores de respuesta adaptados al tono del negocio.',
      'Ayuda para pedir reseñas a clientes satisfechos.',
    ],
    depends: 'Las respuestas las revisa y publica siempre una persona.',
  },
  {
    id: 'automatizacion-ia',
    icon: 'Workflow',
    title: 'Automatización e IA',
    short: 'Flujos personalizados que se adaptan al funcionamiento de cada negocio.',
    summary:
      'Diseñamos flujos a medida: avisos, seguimientos, plantillas y borradores con IA, y una medición básica para saber qué funciona.',
    includes: [
      'Flujos adaptados al proceso real del negocio.',
      'Avisos y seguimientos, con plantillas de WhatsApp aprobadas cuando proceda.',
      'IA para borradores de reseñas y publicaciones, siempre con revisión humana.',
      'Medición básica: conversaciones, solicitudes y citas.',
    ],
    depends:
      'La IA no gestiona la agenda ni responde sola a los clientes: se usa para preparar borradores que revisa una persona.',
  },
];
