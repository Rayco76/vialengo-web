export type Faq = { q: string; a: string; home: boolean };

export const faqs: Faq[] = [
  {
    q: '¿Qué es Vialengo?',
    a: 'Un servicio personalizado que ayuda a negocios locales a captar clientes, automatizar su atención y mejorar su presencia digital: Google, redes sociales, WhatsApp, agenda y reseñas, conectados en un mismo sistema.',
    home: true,
  },
  {
    q: '¿Para qué tipo de negocios es?',
    a: 'Para negocios locales, sobre todo los que trabajan con cita previa. Dental es nuestro primer sector; fisioterapia, clínicas sanitarias, centros de estética y otros negocios con agenda son los siguientes.',
    home: true,
  },
  {
    q: '¿Sustituye a mi equipo o a recepción?',
    a: 'No. Automatiza las tareas repetitivas y ordena las conversaciones para que el equipo dedique su tiempo a atender mejor. Siempre hay una persona que puede continuar la conversación.',
    home: true,
  },
  {
    q: '¿Tengo que cambiar las herramientas que ya uso?',
    a: 'No necesariamente. Primero se analiza lo que ya utilizas. Algunas conexiones, como Google Calendar, están disponibles; otras dependen del software que uses y se valoran caso por caso.',
    home: true,
  },
  {
    q: '¿Utilizáis inteligencia artificial?',
    a: 'Sí, con límites claros. El asistente de WhatsApp sigue reglas definidas con cada negocio. La IA se usa para preparar borradores, como respuestas a reseñas o publicaciones, que revisa y publica una persona. No gestiona la agenda ni responde sola a los clientes.',
    home: true,
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Depende de los servicios y del tamaño del negocio, y por ahora no publicamos precios. La auditoría inicial sirve para definir el alcance y, después, el presupuesto.',
    home: true,
  },
  {
    q: '¿Dónde trabajáis?',
    a: 'Trabajamos en remoto para negocios en España. No tenemos oficina abierta al público.',
    home: true,
  },
  {
    q: '¿Qué datos pedís en el formulario?',
    a: 'Nombre, clínica o negocio, email y, si quieres, teléfono, web y un mensaje. No pedimos datos de salud ni datos de pacientes o clientes.',
    home: false,
  },
];
