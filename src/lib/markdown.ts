import { siteConfig } from '../config/site';
import { cases } from '../content/cases';
import { faqs } from '../content/faqs';
import { integrations } from '../content/integrations';
import { loopSteps, processSteps } from '../content/process';
import { solutions } from '../content/solutions';
import { verticals } from '../content/verticals';
import { absoluteUrl } from './url';

// Versiones Markdown de Home, Servicios y /ai, generadas con los mismos datos que el HTML.

const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');
const integ = (items: { name: string; detail: string }[]) => list(items.map((i) => `**${i.name}**: ${i.detail}`));

export function contactLine(): string {
  const { email } = siteConfig.contact;
  return email
    ? `Escribe a ${email} o solicita la auditoría en ${absoluteUrl('/#auditoria')}.`
    : `Solicitud de auditoría mediante el formulario de ${absoluteUrl('/#auditoria')} (el formulario aún no está activo y el email de contacto está pendiente de publicar).`;
}

export function homeMarkdown(): string {
  return `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} no instala el mismo sistema en todos los negocios: el servicio se adapta al sector, a las herramientas existentes, a la agenda, al proceso de atención y al volumen de cada negocio.

## Growth loop

${loopSteps.map((s, i) => `${i + 1}. **${s.title}**: ${s.text}`).join('\n')}

Y vuelta a empezar: cada reseña aumenta la visibilidad.

## Soluciones

${solutions.map((s) => `- [${s.title}](${absoluteUrl(`/services/#${s.id}`)}): ${s.short}`).join('\n')}

## Cómo funciona

${processSteps.map((s, i) => `${i + 1}. **${s.title}**: ${s.text}`).join('\n')}

## Sectores

${verticals.map((v) => `- ${v.name}${v.status === 'planned' ? ' (preparado, sin página todavía)' : ''}: ${v.summary}`).join('\n')}

## Resultados

Primeros proyectos en implementación. Todavía no se publican cifras de resultados.

## Contacto

${contactLine()}

Más: [Servicios](${absoluteUrl('/services/')}) · [Vialengo para IA](${absoluteUrl('/ai/')})
`;
}

export function servicesMarkdown(): string {
  return `# Servicios de ${siteConfig.name}

> Presencia digital, redes sociales, WhatsApp, citas, reputación y automatización para negocios locales, adaptados a cada negocio.

${solutions
  .map(
    (s) => `## ${s.title}

${s.summary}

${list(s.includes)}
${s.depends ? `\n**Importante:** ${s.depends}\n` : ''}`,
  )
  .join('\n')}
## Proceso de trabajo

${processSteps.map((s, i) => `${i + 1}. **${s.title}**: ${s.text}`).join('\n')}

## Contacto

${contactLine()}
`;
}

export function aiMarkdown(): string {
  return `# ${siteConfig.name} para IA

> Descripción factual de ${siteConfig.name}, pensada para personas y sistemas automáticos.

## Qué es ${siteConfig.name}

${siteConfig.description} Es un servicio personalizado: no un producto de autoservicio.

## Servicios

${solutions.map((s) => `- **${s.title}**: ${s.short}`).join('\n')}

## Tipos de negocio

${verticals.map((v) => `- **${v.name}** (${v.status === 'active' ? 'en funcionamiento' : 'previsto'}): ${v.summary}`).join('\n')}

## Cómo funciona

${processSteps.map((s, i) => `${i + 1}. **${s.title}**: ${s.text}`).join('\n')}

## Integraciones

### Disponibles

${integ(integrations.available)}

### Dependientes del software del cliente

${integ(integrations.dependent)}

### Futuras (no disponibles todavía)

${integ(integrations.future)}

## Área geográfica

${siteConfig.country.name}, en remoto. Sin oficina abierta al público.

## Modelo de servicio

Servicio personalizado para negocios. No se publican precios; la auditoría inicial define el alcance.

## Estado de los proyectos

${cases.map((c) => `- ${c.title}: ${c.status === 'in-progress' ? 'en implementación' : 'publicado'}.`).join('\n')}

## Preguntas frecuentes

${faqs.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}

## Contacto

${contactLine()}
`;
}
