let accessToken: string | undefined;

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';

export const setToken = (token: string) => {
  accessToken = token;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const isAuthenticated = () => accessToken !== undefined;

export const clearToken = () => {
  accessToken = undefined;
  window.localStorage.clear();
};

// export const loadLocalToken = () => {
//   const localToken = window.localStorage.getItem(ACCESS_TOKEN_KEY);
//   if (localToken) {
//     setToken(localToken);
//   }
// };
