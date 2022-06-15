import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressesAPI } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function ShippingAddress(props) {
  const { setAddress } = props;
  const [addresses, setAddresses] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const { auth, logout } = useAuth();

  const getAddresses = async () => {
    const resGetAddresses = await getAddressesAPI(auth.idUser, logout);
    setAddresses(resGetAddresses.data || []);
  };

  useEffect(() => {
    getAddresses();
  }, []); // eslint-disable-line

  return (
    <div className="shipping-address">
      <div className="title">Direccion de envio</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay direcciones{" "}
            <Link href="/account">
              <a>Añadir tu primera dirección</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  address={address}
                  setAddress={setAddress}
                  currentAddress={currentAddress}
                  setCurrentAddress={setCurrentAddress}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

const Address = (props) => {
  const { address, setAddress, currentAddress, setCurrentAddress } = props;

  const changeAddress = () => {
    setCurrentAddress(address.id);
    setAddress(address);
  };

  return (
    <div
      className={classNames("address", {
        active: currentAddress === address.id,
      })}
      onClick={changeAddress}
    >
      <p>{address.attributes.title}</p>
      <p>{address.attributes.name}</p>
      <p>{address.attributes.address}</p>
      <p>
        {address.attributes.city}, {address.attributes.state},{" "}
        {address.attributes.postalCode}
      </p>
      <p>{address.attributes.phone}</p>
    </div>
  );
};
