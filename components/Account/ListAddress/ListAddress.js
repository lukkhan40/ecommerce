import { useState, useEffect } from "react";
import { map, size } from "lodash";
import { getAddressesAPI, deleteAddressAPI } from "../../../api/address";
import { getUserAPI } from "../../../api/user";
import useAuth from "../../../hooks/useAuth";
import { Grid, Button } from "semantic-ui-react";

export default function ListAddress(props) {
  const { reloadAddresses, setReloadAddresses, handleOpenModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  const checkAddresses = async () => {
    const resGetAddressesAPI = await getAddressesAPI(auth.idUser, logout);

    const resGetUserAPI = await getUserAPI(auth.idUser, logout);

    setAddresses(resGetAddressesAPI.data || []);
    setReloadAddresses(false);
  };

  useEffect(() => {
    checkAddresses();
  }, [reloadAddresses]); // eslint-disable-line

  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay ninguna direccion creada</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddresses={setReloadAddresses}
                handleOpenModal={handleOpenModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

const Address = (props) => {
  const { address, logout, setReloadAddresses, handleOpenModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteAddress = async () => {
    setLoadingDelete(true);
    const resDeleteAddressAPI = await deleteAddressAPI(address.id, logout);
    if (resDeleteAddressAPI) setReloadAddresses(true);
    setLoadingDelete(false);
  };

  return (
    <div className="address">
      <p>{address.attributes.title}</p>
      <p>{address.attributes.name}</p>
      <p>{address.attributes.address}</p>
      <p>
        {address.attributes.state}, {address.attributes.city},{" "}
        {address.attributes.postalCode}
      </p>
      <p>{address.attributes.phone}</p>
      <div className="actions">
        <Button
          primary
          onClick={() =>
            handleOpenModal(`Editar: ${address.attributes.title}`, address)
          }
        >
          Editar
        </Button>
        <Button onClick={handleDeleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};
