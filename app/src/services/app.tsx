import http from '../utils/http';
import { interpolate } from '../utils/string';
import {
  APP_USERS_URL,
  APP_URL,
  APP_LOCATION_URL,
  APP_REDIRECT_URL_URL,
} from '../constants/endpoints';

export const fetchApp = async (appName: string, params?: any): Promise<any> => {
  const { data } = await http.get(interpolate(APP_URL, { appName }), {
    params,
  });

  return data;
};

export const fetchUsersInApp = async (
  appName: string,
  params: any
): Promise<any> => {
  const { data } = await http.get(interpolate(APP_USERS_URL, { appName }), {
    params,
  });

  return data;
};

export const updateApp = async (app: any) => {
  const data = await http.put(interpolate(APP_URL, { appName: app.name }), {
    body: app,
  });

  return data;
};

export const updateAppLocation = async (appName: string, location: any) => {
  const data = await http.put(interpolate(APP_LOCATION_URL, { appName }), {
    body: location,
  });

  return data;
};

export const updateAppRedirectUrl = async (
  appName: string,
  redirectUrl: any
) => {
  const data = await http.put(interpolate(APP_REDIRECT_URL_URL, { appName }), {
    body: redirectUrl,
  });

  return data;
};
