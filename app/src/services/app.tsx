import http from '../utils/http';
import { APP_USERS_URL, APP_URL } from '../constants/endpoints';
import { interpolate } from '../utils/string';

export const fetchApp = async (appName: string): Promise<any> => {
  const { data } = await http.get(interpolate(APP_URL, { appName }));

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
