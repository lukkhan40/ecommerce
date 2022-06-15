import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const getOrderAPI = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/api/orders?_sort=createdAt:desc&user=${idUser}`;
    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
