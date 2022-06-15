import { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getGameByUrlAPI } from "../api/game";
import useCart from "../hooks/useCart";
import SummaryCart from "../components/Cart/SummaryCart";
import ShippingAddress from "../components/Cart/ShippingAddress";
import Payment from "../components/Cart/Payment";

export default function Cart() {
  const { getProductsCart } = useCart();
  const products = getProductsCart();

  return !products ? <EmptyCart /> : <FullCart products={products} />;
}

const EmptyCart = () => {
  return (
    <BasicLayout className="cart">
      <h2>No hay productos en el carrito</h2>
    </BasicLayout>
  );
};

const FullCart = (props) => {
  const { products } = props;
  const [productsData, setProductsData] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [address, setAddress] = useState(null);

  const getGameByUrl = async () => {
    const resGetGameByUrl = await getGameByUrlAPI();
    const filterGames = resGetGameByUrl.data.filter((game) => {
      for (let product of products)
        if (product === game.attributes.url) return game;
    });
    setProductsData(filterGames);
    setReloadCart(false);
  };

  useEffect(() => {
    getGameByUrl();
  }, [reloadCart]); // eslint-disable-line

  return (
    <BasicLayout className="cart">
      <SummaryCart
        productsData={productsData}
        reloadCart={reloadCart}
        setReloadCart={setReloadCart}
      />
      <ShippingAddress setAddress={setAddress} />
      {address && <Payment productsData={productsData} address={address} />}
    </BasicLayout>
  );
};
