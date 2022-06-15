import { useState, useEffect } from "react";
import { Table, Image, Icon, Tab } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hooks/useCart";

export default function SummaryCart(props) {
  const { productsData, reloadCart, setReloadCart } = props;
  const [totalPrice, setTotalPrice] = useState(0);
  const { removeProductCart } = useCart();

  const total = () => {
    let finalPrice = 0;
    let currentPrice = 0;
    let currentDiscount = 0;
    let amountDiscount = 0;
    forEach(productsData, (product) => {
      currentPrice = parseFloat(product.attributes.price);
      currentDiscount = product.attributes.discount;
      amountDiscount = Math.floor(currentPrice * currentDiscount) / 100;
      finalPrice += parseFloat((currentPrice - amountDiscount).toFixed(2));
    });
    setTotalPrice(finalPrice);
  };

  useEffect(() => {
    total();
  }, [reloadCart, productsData]); // eslint-disable-line

  const removeProduct = (product) => {
    removeProductCart(product);
    setReloadCart(true);
  };

  return (
    <div className="summary-cart">
      <div className="title">Resumen del carrito</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(productsData, (product) => (
              <Table.Row key={product.id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => removeProduct(product.attributes.url)}
                  />
                  <Image
                    src={product.attributes.poster?.url}
                    alt={product.attributes.title}
                  />
                  {product.attributes.title}
                </Table.Cell>
                <Table.Cell>{product.attributes.platform?.title}</Table.Cell>
                <Table.Cell>Inmedita</Table.Cell>
                <Table.Cell>
                  $
                  {(
                    product.attributes.price -
                    Math.floor(
                      product.attributes.price * product.attributes.discount
                    ) /
                      100
                  ).toFixed(2)}
                </Table.Cell>
              </Table.Row>
            ))}
            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear" />
              <Table.Cell colSpan="2">Total:</Table.Cell>
              <Table.Cell className="total-price">
                ${totalPrice.toFixed(2)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
