import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * Get a key from the cookies.
 *
 * @param {String} key : whose value to get.
 */
const get = (key: string): string => {
  return cookies.get(key);
};

/**
 * Set value into a key to the cookies.
 *
 * @param {String} key : whose Value to set.
 * @param {*} value : Value to set.
 */
const set = (key: string, value: string): void => {
  cookies.set(key, value, {
    path: '/',
  });
};

/**
 * Remove key value pair in cookies.
 *
 * @param {string} key
 */
const remove = (key: string): void => {
  cookies.remove(key);
};

export { get, set, remove };
