// Simple vanilla template renderer: replaces {key} with data[key]
export function renderTemplate(template, data) {
  return template.replace(/\{(\w+)\}/g, (_, key) => data[key] ?? '');
}
