/**
 *
 * @param {string} string
 * @param {any} object
 * @returns {string}
 */
export const interpolate = (string: string, object: any): string => {
  Object.keys(object).forEach((key) => {
    string = string.replace(new RegExp(`:${key}`, 'g'), object[key]);
  });

  return string;
};

export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
