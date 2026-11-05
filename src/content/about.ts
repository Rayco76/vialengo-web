// Contenido compartido por la portada y sus versiones de texto.
export const trust = {
  title: 'Tecnología útil, con una persona responsable detrás',
  intro: 'Vialengo combina automatización y criterio humano para que tu negocio gane tiempo sin perder el control. Trabajamos contigo, explicamos cada paso y las decisiones importantes siempre son tuyas.',
  principles: [
    {
      icon: 'Users',
      title: 'Accesos bajo control',
      text: 'Tu negocio mantiene la propiedad de sus perfiles, cuentas y datos. Los accesos se conceden solo para el trabajo necesario y pueden revisarse o retirarse cuando quieras.',
    },
    {
      icon: 'Workflow',
      title: 'Automatización con supervisión',
      text: 'El asistente de WhatsApp sigue reglas y ordena las solicitudes. La IA prepara borradores de contenidos y reseñas que revisa una persona. Las situaciones sensibles y la atención compleja se derivan al equipo; las decisiones importantes siguen en tus manos.',
    },
    {
      icon: 'CalendarCheck',
      title: 'Trabajo claro y medible',
      text: 'Calendario de trabajo visible, contenidos revisables y resultados explicados con claridad. Acordamos qué medimos y qué nos dicen esos datos, sin promesas vacías ni métricas decorativas.',
    },
  ],
} as const;

export const founder = {
  name: 'Rayco Rivero González',
  role: 'Fundador de Vialengo',
  title: 'Una colaboración cercana, no una plataforma impersonal',
  paragraphs: [
    'Soy Rayco, fundador de Vialengo. Trabajo con cada negocio para ordenar su presencia digital, automatizar lo repetitivo y mantener el trato humano donde importa: la atención a tus clientes y las decisiones del negocio.',
    'Mi objetivo no es llenar tus canales de herramientas o publicaciones sin sentido. Es construir un sistema sencillo, entendible y útil para que puedas centrarte en lo tuyo: atender bien.',
  ],
  // Foto temporal (selfie) hasta tener la profesional: sustituir public/team/rayco.webp
  // (600×800, 3:4). Con src null se muestra un placeholder, nunca una foto ficticia.
  photo: { src: '/team/rayco.webp' as string | null, alt: 'Rayco Rivero González, fundador de Vialengo' },
};
