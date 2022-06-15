import { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getMeAPI } from "../api/user";
import useAuth from "../hooks/useAuth";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  const comprove = async () => {
    const resGetMeAPI = await getMeAPI(logout);
    setUser(resGetMeAPI || null);
  };

  useEffect(() => {
    comprove();
  }, [auth]); // eslint-disable-line

  if (user === undefined) return null;

  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses />
    </BasicLayout>
  );
}

const Configuration = (props) => {
  const { user, logout, setReloadUser } = props;

  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
      </div>
    </div>
  );
};

const Addresses = () => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddresses, setReloadAddresses] = useState(false);

  const handleOpenModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddresses={setReloadAddresses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Direcciones{" "}
        <Icon
          name="plus"
          link
          onClick={() => handleOpenModal("Nueva Direccion")}
        />
      </div>
      <div className="data">
        <ListAddress
          reloadAddresses={reloadAddresses}
          setReloadAddresses={setReloadAddresses}
          handleOpenModal={handleOpenModal}
        />
      </div>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={titleModal}
      >
        {formModal}
      </BasicModal>
    </div>
  );
};
