import { siteConfig } from '../config/site';
import { solutions } from '../content/solutions';
import { absoluteUrl } from './url';

// JSON-LD: solo propiedades reales. No se incluyen dirección, teléfono, fecha de
// fundación, valoraciones, empleados ni precios porque no se conocen o no existen.
// Vialengo es una organización de servicios, no un LocalBusiness con local abierto.

const orgId = `${absoluteUrl('/')}#organization`;
const siteId = `${absoluteUrl('/')}#website`;
const country = { '@type': 'Country', name: siteConfig.country.name };

export function organization() {
  const sameAs = siteConfig.social.map((s) => s.url);
  return {
    '@type': 'Organization',
    '@id': orgId,
    name: siteConfig.name,
    url: absoluteUrl('/'),
    description: siteConfig.description,
    areaServed: country,
    ...(siteConfig.contact.email && { email: siteConfig.contact.email }),
    ...(sameAs.length && { sameAs }),
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': siteId,
    url: absoluteUrl('/'),
    name: siteConfig.name,
    inLanguage: siteConfig.locale,
    publisher: { '@id': orgId },
  };
}

export function webPage(path: string, name: string, description: string, type = 'WebPage') {
  return {
    '@type': type,
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: siteConfig.locale,
    isPartOf: { '@id': siteId },
    about: { '@id': orgId },
  };
}

export function serviceNodes() {
  return solutions.map((s) => ({
    '@type': 'Service',
    '@id': `${absoluteUrl('/services/')}#${s.id}`,
    name: s.title,
    serviceType: s.title,
    description: s.summary,
    provider: { '@id': orgId },
    areaServed: country,
    url: absoluteUrl(`/services/#${s.id}`),
  }));
}

export function faqPage(path: string, items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(path)}#faq`,
    isPartOf: { '@id': siteId },
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

/** Serializa evitando que "</script>" rompa el bloque. */
export function toScript(graph: object[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
