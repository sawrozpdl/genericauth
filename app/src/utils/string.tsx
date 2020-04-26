/**
 *
 * @param {string} string
 * @param {any} object
 * @returns {string}
 */
const interpolate = (string: string, object: any): string => {
  Object.keys(object).forEach((key) => {
    string = string.replace(new RegExp(`:${key}`, 'g'), object[key]);
  });

  return string;
};

export { interpolate };
