import { toast } from "react-toastify";
import { size, includes, remove } from "lodash";
import { BASE_PATH, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export const getProductsCartAPI = () => {
  const cart = localStorage.getItem(CART);

  if (!cart) return null;
  else {
    const products = cart.split(",");
    return products;
  }
};

export const addProductCartAPI = (product) => {
  const cart = getProductsCartAPI();

  if (!cart) {
    localStorage.setItem(CART, product);
    toast.success("Producto añadido al carrito");
  } else {
    const productFound = includes(cart, product);

    if (productFound) {
      toast.warning("Este producto ya esta en el carrito");
    } else {
      cart.push(product);
      localStorage.setItem(CART, cart);
      toast.success("Producto añadido correctamente");
    }
  }
};

export const countProductsCartAPI = () => {
  const cart = getProductsCartAPI();

  if (!cart) return 0;
  else return size(cart);
};

export const removeProductCartAPI = (product) => {
  const cart = getProductsCartAPI();

  remove(cart, (item) => {
    return item === product;
  });

  if (size(cart) > 0) {
    localStorage.setItem(CART, cart);
  } else {
    localStorage.removeItem(CART);
  }
};

export const paymentCartAPI = async (
  token,
  products,
  idUser,
  address,
  logout
) => {
  try {
    const shippingAddress = address;
    delete shippingAddress.user;
    delete shippingAddress.createdAt;

    const url = `${BASE_PATH}/api/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        shippingAddress,
      }),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const removeAllProductsCartAPI = () => {
  localStorage.removeItem(CART);
};
