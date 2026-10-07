export type AnalyticsEvent =
  | 'page_view'
  | 'cta_click'
  | 'audit_form_started'
  | 'audit_form_submitted'
  | 'scroll_50'
  | 'scroll_90';

export function trackEvent(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  try {
    window.dispatchEvent(new CustomEvent('vialengo:event', { detail: { event, properties } }));
  } catch {
    // La analítica nunca debe afectar a la experiencia de la página.
  }
}
