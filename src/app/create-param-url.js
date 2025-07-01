import { map, merge } from 'lodash';

export function createParamsUrl(current, overrides) {
  return (
    '#' +
    map(merge(current, overrides), function (val, key) {
      return key + '=' + val;
    }).join(',')
  );
}
