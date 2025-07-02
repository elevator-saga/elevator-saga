export function createParamsUrl(current, overrides) {
  return (
    '#' +
    Object.entries({ ...current, ...overrides })
      .map(([key, val]) => key + '=' + val)
      .join(',')
  );
}
