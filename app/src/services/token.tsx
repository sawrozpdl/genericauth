import * as storage from '../utils/storage';

import httpConstants from '../constants/http';

const { ACCESS_TOKEN, REFRESH_TOKEN } = httpConstants;

/**
 * Persist token to storage.
 *
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export function persist(accessToken: string, refreshToken: string) {
  storage.set(ACCESS_TOKEN, accessToken);
  storage.set(REFRESH_TOKEN, refreshToken);
}

/**
 * Get access token from storage.
 *
 * @returns {string}
 */
export function getAccessToken() {
  return storage.get(ACCESS_TOKEN);
}

/**
 * Set access token from storage.
 *
 * @param {string} accessToken
 */
export function setAccessToken(accessToken: string) {
  storage.set(ACCESS_TOKEN, accessToken);
}

/**
 * Get refresh token from storage.
 *
 * @returns {string}
 */
export function getRefreshToken() {
  return storage.get(REFRESH_TOKEN);
}

/**
 * Clear tokens.
 */
export function clear() {
  storage.remove(ACCESS_TOKEN);
  storage.remove(REFRESH_TOKEN);
}
