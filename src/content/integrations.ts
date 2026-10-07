// Estado real de las integraciones. Mantenerlo honesto: si no está disponible, no va en `available`.

export type Integration = { name: string; detail: string };

export const integrations = {
  available: [
    { name: 'WhatsApp Business Platform (Meta)', detail: 'Atención por WhatsApp con número de empresa.' },
    {
      name: 'Google Calendar',
      detail: 'Consulta de disponibilidad y creación de citas. No mueve ni cancela citas existentes.',
    },
    {
      name: 'Google Business Profile',
      detail: 'Seguimiento de reseñas y borradores de respuesta que revisa una persona.',
    },
  ] satisfies Integration[],
  dependent: [
    {
      name: 'Software de gestión o agenda del negocio',
      detail:
        'Depende de que el programa ofrezca acceso técnico. Se valora en la auditoría y no está garantizado.',
    },
    {
      name: 'Otros calendarios y herramientas',
      detail: 'Se estudian caso por caso según lo que use cada negocio.',
    },
  ] satisfies Integration[],
  future: [
    {
      name: 'Conexión con software de gestión de clínicas',
      detail: 'En desarrollo. Todavía no está disponible para clientes.',
    },
    {
      name: 'Sincronización bidireccional de agendas',
      detail: 'Prevista: cambios en la agenda reflejados en ambos sentidos.',
    },
  ] satisfies Integration[],
};
