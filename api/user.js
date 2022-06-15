import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const registerAPI = async (formData) => {
  try {
    const url = `${BASE_PATH}/api/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const loginAPI = async (formData) => {
  try {
    const url = `${BASE_PATH}/api/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const resetPasswordAPI = async (email) => {
  try {
    const url = `${BASE_PATH}/api/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMeAPI = async (logout) => {
  try {
    const url = `${BASE_PATH}/api/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserAPI = async (idUser, logout) => {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateNameAPI = async (idUser, data, logout) => {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateEmailAPI = async (idUser, email, logout) => {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updatePasswordAPI = async (idUser, password, logout) => {
  try {
    const url = `${BASE_PATH}/api/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };

    const result = await authFetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
