import storage from 'helpers/storage';
import { User } from 'state/interfaces';

export const AUTH = 'auth';
export const USER = 'user';
export const ACCESS_TOKEN = 'access_token';

export const persistLogin = (
  authenticated: boolean,
  user: User,
  token: string
) => {
  storage.setItem(AUTH, authenticated);
  storage.setItem(USER, user);
  storage.setItem(ACCESS_TOKEN, token);
};

export const getAuth = () => {
  const authenticated = Boolean(storage.getItem(AUTH));
  const user = storage.getItem(USER);
  return {
    user: user ? (JSON.parse(user) as User) : null,
    authenticated,
  };
};

export const getAuthToken = () => storage.getItem(ACCESS_TOKEN);

export const clearAuth = () => {
  storage.removeItem(AUTH);
  storage.removeItem(USER);
};
