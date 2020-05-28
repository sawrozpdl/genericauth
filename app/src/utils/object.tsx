export const collectObject = (source: any, array: any, accessor: any) =>
  source.filter((val: any) => array.includes(val[accessor]));

/**
 * Get the copy of object without attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrsToExclude
 * @returns {Object}
 */
export function withoutAttrs(obj: any, attrsToExclude: any) {
  const result: any = {};

  Object.keys(obj).forEach((key) => {
    if (!attrsToExclude.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}

/**
 * Get the copy of object with only specified attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrs
 * @returns {Object}
 */
export function withAttrs(obj: any, attrs: any) {
  const result: any = {};

  Object.keys(obj).forEach((key) => {
    if (attrs.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
}
