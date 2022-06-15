import { TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export const setToken = (token) => localStorage.setItem(TOKEN, token);

export const getToken = () => localStorage.getItem(TOKEN);

export const removeToken = () => localStorage.removeItem(TOKEN);

export const hasExpiredToken = (token) => {
  const tokenDecode = jwtDecode(token);
  const expiredDate = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();

  if (currentDate > expiredDate) return true;
  else return false;
};
