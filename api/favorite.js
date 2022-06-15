import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from "lodash";

export const isFavoriteAPI = async (idUser, idGame, logout) => {
  try {
    const url = `${BASE_PATH}/api/favorites?user=${idUser}&game=${idGame}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addFavoriteAPI = async (idUser, idGame, logout) => {
  try {
    const dataFound = await isFavoriteAPI(idUser, idGame, logout);
    if (size(dataFound.data) > 0 || !dataFound)
      return "Este juego ya lo tienes en tu lista de favoritos";
    else {
      const url = `${BASE_PATH}/api/favorites`;
      const params = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { user: idUser, game: idGame } }),
      };
      const result = await authFetch(url, params, logout);
      return result;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteFavoriteAPI = async (idUser, idGame, logout) => {
  try {
    const dataFound = await isFavoriteAPI(idUser, idGame, logout);
    if (size(dataFound.data) > 0 || !dataFound) {
      const url = `${BASE_PATH}/api/favorites/${dataFound.data[0].id}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { user: idUser, game: idGame } }),
      };
      const result = await authFetch(url, params, logout);
      return result;
    } else {
      return "Este juego no se puede quitar, ya que no existe en favoritos";
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getFavoriteAPI = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/api/favorites?user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
