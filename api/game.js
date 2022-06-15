import { BASE_PATH } from "../utils/constants";

export const getLastGamesAPI = async (limit) => {
  try {
    const limitItems = `_limit=${limit}`; //_limit no es compatible con Strapi 4.0>
    const sortItem = "_sort=createdAt:desc";
    const url = `${BASE_PATH}/api/games?${limitItems}&${sortItem}`;
    const response = await fetch(url);
    const result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGamesPlatformAPI = async (platform, limit, start) => {
  try {
    const limitItems = `_limit=${limit}`;
    const sortItems = `_sort=createdAt:desc`;
    const startItems = `_start=${start}`;
    const url = `${BASE_PATH}/api/games?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getGameByUrlAPI = async (path) => {
  try {
    const url = `${BASE_PATH}/api/games?url=${path}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const searchGamesAPI = async (title) => {
  try {
    const url = `${BASE_PATH}/api/games?_q=${title}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
