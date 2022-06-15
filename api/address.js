import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const createAddressAPI = async (address, logout) => {
  try {
    const url = `${BASE_PATH}/api/addresses`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: address }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getAddressesAPI = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/api/addresses?user=${idUser}`;
    const result = await authFetch(url, null, logout);
    if (result.statusCode === 500) throw "Error del Servidor";
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteAddressAPI = async (idAddress, logout) => {
  try {
    const url = `${BASE_PATH}/api/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    if (result.statusCode === 500) throw "Error del Servidor";
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateAddressAPI = async (idAddress, address, logout) => {
  try {
    const url = `${BASE_PATH}/api/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: address }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};
