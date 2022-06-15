import { useState } from "react";
import { Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/BasicModal";

export default function Order(props) {
  const { order } = props;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${order.game?.attributes.url}`}>
              <a>
                <Image
                  src={order.game?.attributes.poster.url}
                  alt={order.game?.attributes.title}
                />
              </a>
            </Link>
            <div>
              <h2>{order.game?.attributes.title}</h2>
              <p>${order.totalPayment}</p>
            </div>
          </div>
          <div className="order__other">
            <p className="order__other-data">{order.createdAt}</p>
            <Icon name="eye" circular link onClick={() => setShowModal(true)} />
          </div>
        </div>
      </div>
      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        shippingAddress={order.shippingAddress}
        title={order.game?.attributes.title}
      />
    </>
  );
}

const AddressModal = (props) => {
  const { showModal, setShowModal, shippingAddress, title } = props;

  return (
    <BasicModal
      showModal={showModal}
      setShowModal={setShowModal}
      size="tiny"
      title={title}
    >
      <h3>El pedido se ha enviado a la siguiente direccion</h3>
      <div>
        <p>{shippingAddress.attributes.name}</p>
        <p>{shippingAddress.attributes.address}</p>
        <p>
          {shippingAddress.attributes.state}, {shippingAddress.attributes.city},{" "}
          {shippingAddress.attributes.postalCode}
        </p>
        <p>{shippingAddress.attributes.phone}</p>
      </div>
    </BasicModal>
  );
};
