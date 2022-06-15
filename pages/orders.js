import { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import { getOrderAPI } from "../api/order";
import useAuth from "../hooks/useAuth";
import Order from "../components/Orders/Order";
import Seo from "../components/Seo";

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const { auth, logout } = useAuth();

  const getOrder = async () => {
    const resGetOrder = await getOrderAPI(auth.idUser, logout);

    setOrders(resGetOrder.data || []);
  };

  useEffect(() => {
    getOrder();
  }, []); // eslint-disable-line

  return (
    <BasicLayout className="orders">
      <Seo title="Mis pedidos" description="Listado de todos los pedidos" />
      <div className="orders__block">
        <div className="title">Mis pedidos</div>
        <div className="data">
          {size(orders) === 0 ? (
            <h2 style={{ text: "center" }}>
              Todavia no has realizado ninguna compra
            </h2>
          ) : (
            <OrderList orders={orders} />
          )}
        </div>
      </div>
    </BasicLayout>
  );
}

const OrderList = (props) => {
  const { orders } = props;

  return (
    <Grid>
      {map(orders, (order) => (
        <Grid.Column mobile={16} tablet={6} computer={8}>
          <Order order={order} />
        </Grid.Column>
      ))}
    </Grid>
  );
};
