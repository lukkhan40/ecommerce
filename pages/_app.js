import { useMemo, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { setToken, getToken, removeToken } from "../api/token";
import {
  getProductsCartAPI,
  addProductCartAPI,
  countProductsCartAPI,
  removeProductCartAPI,
  removeAllProductsCartAPI,
} from "../api/cart";
import "../scss/global.scss";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductCart, setTotalProductCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);

  useEffect(() => {
    const token = getToken();

    if (token)
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    else setAuth(null);

    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    setTotalProductCart(countProductsCartAPI());
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({ token, idUser: jwtDecode(token).id });
  };

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  };

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth] // eslint-disable-line
  );

  const addProduct = (product) => {
    const token = getToken();

    if (token) {
      addProductCartAPI(product);
      setReloadCart(true);
    } else toast.warning("Para comprar un juego tienes que iniciar sesión");
  };

  const removeProduct = (product) => {
    removeProductCartAPI(product);
    setReloadCart(true);
  };

  const cartData = useMemo(
    () => ({
      productsCart: totalProductCart,
      addProductCart: (product) => addProduct(product),
      getProductsCart: getProductsCartAPI,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCartAPI,
    }),
    [totalProductCart]
  );

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={cartData}>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}
