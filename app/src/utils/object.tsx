export const collectObject = (source: any, array: any, accessor: any) =>
  source.filter((val: any) => array.includes(val[accessor]));

/**
 * Get the copy of object without attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrsToExclude
 * @returns {Object}
 */
export const withoutAttrs = (obj: any, attrsToExclude: any) => {
  const result: any = {};

  Object.keys(obj).forEach((key) => {
    if (!attrsToExclude.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
};

/**
 * Get the copy of object with only specified attributes.
 *
 * @param  {Object} obj
 * @param  {Array} attrs
 * @returns {Object}
 */
export const withAttrs = (obj: any, attrs: any) => {
  const result: any = {};

  Object.keys(obj).forEach((key) => {
    if (attrs.includes(key)) {
      result[key] = obj[key];
    }
  });

  return result;
};

export const getObjectById = (objects: any, id: any) =>
  objects.find((object: any) => object.id === +id);

export const checked = (value: any, options: any) => {
  if (value !== true) {
    return options.message || 'must be checked';
  }
};

export const nullEmptyKeys = (object: any, keys?: string[]): void => {
  if (!keys || !keys.length) {
    keys = Object.keys(object);
  }
  keys.forEach((key) => {
    if (!object[key]) {
      object[key] = null;
    }
  });

  return object;
};
