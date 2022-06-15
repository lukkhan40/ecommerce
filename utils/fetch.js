import { getToken, hasExpiredToken } from "../api/token";

export const authFetch = async (url, params, logout) => {
  const token = getToken();
  if (!token) logout();
  else {
    if (hasExpiredToken(token)) logout();
    else {
      const internalParams = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, internalParams);
        const result = await response.json();
        return result;
      } catch (error) {
        console.log(error);
        return error;
      }
    }
  }
};
