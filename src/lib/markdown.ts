import { siteConfig } from '../config/site';
import { founder, trust } from '../content/about';
import { cases } from '../content/cases';
import { faqs } from '../content/faqs';
import { integrations } from '../content/integrations';
import { processSteps } from '../content/process';
import { solutions } from '../content/solutions';
import { verticals } from '../content/verticals';
import { absoluteUrl } from './url';

// Versiones Markdown de Home, Servicios y /ai, generadas con los mismos datos que el HTML.

const list = (items: string[]) => items.map((i) => `- ${i}`).join('\n');
const integ = (items: { name: string; detail: string }[]) => list(items.map((i) => `**${i.name}**: ${i.detail}`));

export function contactLine(): string {
  const { email } = siteConfig.contact;
  return email
    ? `Escribe a ${email} o cuéntanos qué necesitas en ${absoluteUrl('/#auditoria')}.`
    : `Consulta mediante el formulario de ${absoluteUrl('/#auditoria')} (el formulario aún no está activo y el email de contacto está pendiente de publicar).`;
}

export function homeMarkdown(): string {
  return `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} no instala el mismo sistema en todos los negocios: el servicio se adapta al sector, a las herramientas existentes, a la agenda, al proceso de atención y al volumen de cada negocio.

## Acompañamiento digital

Acordamos qué llevamos por ti, qué material y aprobaciones necesitamos y con qué frecuencia trabajamos. Puedes empezar por un servicio o combinar varios. Mantenemos al día las áreas contratadas y valoramos nuevas necesidades contigo.

## Soluciones

${solutions.map((s) => `- [${s.title}](${absoluteUrl(`/services/#${s.id}`)}): ${s.short}`).join('\n')}

## Cómo funciona

${processSteps.map((s, i) => `${i + 1}. **${s.title}**: ${s.text}`).join('\n')}

## ${trust.title}

${trust.intro}

${trust.principles.map((p) => `- **${p.title}**: ${p.text}`).join('\n')}

## Sobre Vialengo

${founder.paragraphs.join('\n\n')}

${founder.name} · ${founder.role}

## Sectores

${verticals.map((v) => `- ${v.name}${v.status === 'planned' ? ' (preparado, sin página todavía)' : ''}: ${v.summary}`).join('\n')}

## Casos y primeras señales

${cases.map((c) => `### [${c.title}](${absoluteUrl(`/cases/${c.slug}/`)})\n\n${c.summary}${c.initialSignals ? `\n\n${c.initialSignals.summary}\n\n${c.initialSignals.source} ${c.initialSignals.note}` : ''}`).join('\n\n')}

## Contacto

${contactLine()}

Más: [Servicios](${absoluteUrl('/services/')}) · [Vialengo para IA](${absoluteUrl('/ai/')})
`;
}

export function servicesMarkdown(): string {
  return `# Servicios de ${siteConfig.name}

> Web y mantenimiento, redes sociales, Google Business y reputación, WhatsApp, citas y soluciones digitales a medida para negocios locales.

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

${siteConfig.description} Es un servicio personalizado: no un producto de autoservicio. Su fundador es ${founder.name}.

## Forma de trabajar

${trust.intro}

${trust.principles.map((p) => `- **${p.title}**: ${p.text}`).join('\n')}

## Servicios

${solutions.map((s) => `- **${s.title}**: ${s.short}`).join('\n')}

## Tipos de negocio

${verticals.map((v) => `- **${v.name}** (${v.status === 'active' ? 'primer sector, primer proyecto en implementación' : 'previsto'}): ${v.summary}`).join('\n')}

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

Servicio personalizado para negocios. No se publican precios; la primera conversación define el alcance.

## Estado de los proyectos

${cases.map((c) => `- ${c.title}: ${c.status === 'in-progress' ? 'en implementación' : 'publicado'}.`).join('\n')}

## Preguntas frecuentes

${faqs.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}

## Contacto

${contactLine()}
`;
}
