const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

export const setToken = (token: string) => {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const clearToken = () => {
  window.localStorage.clear();
};

