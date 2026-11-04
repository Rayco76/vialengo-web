// Contenido compartido por la portada y sus versiones de texto.
export const trust = {
  title: 'Tecnología útil, con una persona responsable detrás',
  intro: 'Vialengo combina automatización y criterio humano para que tu clínica gane tiempo sin perder control. Trabajamos contigo, explicamos cada paso y dejamos siempre las decisiones importantes en manos de la clínica.',
  principles: [
    {
      icon: 'Users',
      title: 'Accesos bajo control',
      text: 'La clínica mantiene la propiedad de sus perfiles, cuentas y datos. Los accesos se conceden solo para el trabajo necesario y pueden revisarse o retirarse cuando quieras.',
    },
    {
      icon: 'Workflow',
      title: 'Automatización con supervisión',
      text: 'El asistente de WhatsApp sigue reglas y ordena las solicitudes. La IA prepara borradores de contenidos y reseñas que revisa una persona. Las situaciones sensibles y la atención compleja se derivan al equipo; las decisiones importantes siguen en manos de la clínica.',
    },
    {
      icon: 'CalendarCheck',
      title: 'Trabajo claro y medible',
      text: 'Calendario de trabajo visible, contenidos revisables y resultados explicados con claridad. Acordamos qué medimos y qué nos dicen esos datos, sin promesas vacías ni métricas decorativas.',
    },
  ],
} as const;

export const founder = {
  name: 'Rayco González',
  role: 'Fundador de Vialengo',
  title: 'Una colaboración cercana, no una plataforma impersonal',
  paragraphs: [
    'Soy Rayco, fundador de Vialengo. Trabajo con cada clínica para ordenar su presencia digital, automatizar lo repetitivo y mantener el control humano donde importa: la atención a pacientes y las decisiones del negocio.',
    'Mi objetivo no es llenar tus canales de herramientas o publicaciones sin sentido. Es construir un sistema sencillo, entendible y útil para que tu clínica pueda centrarse en atender bien.',
  ],
  // Foto temporal (selfie) hasta tener la profesional: sustituir public/team/rayco.webp
  // (600×800, 3:4). Con src null se muestra un placeholder, nunca una foto ficticia.
  photo: { src: '/team/rayco.webp' as string | null, alt: 'Rayco González, fundador de Vialengo' },
};
