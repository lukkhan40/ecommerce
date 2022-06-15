import { useState, useEffect } from "react";
import {
  Container,
  Menu as MenuSR,
  Grid,
  Icon,
  Label,
} from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { getMeAPI } from "../../../api/user";
import { getPlatformsAPI } from "../../../api/platform";

export default function Menu() {
  const { auth, logout } = useAuth();
  const [user, setUser] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar sesion");
  const [platforms, setPlatforms] = useState([]);

  const comprove = async () => {
    const resGetMe = await getMeAPI(logout);
    setUser(resGetMe);
  };

  useEffect(() => {
    comprove();
  }, [auth]); // eslint-disable-line

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => setShowModal(false);

  const getPlatforms = async () => {
    const resGetPlatforms = await getPlatformsAPI(logout);
    setPlatforms(resGetPlatforms.data || []);
  };

  useEffect(() => {
    getPlatforms();
  }, []); //eslint-disable-line

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms platforms={platforms} />
          </Grid.Column>
          <Grid.Column className="menu__right" width={10}>
            {user !== undefined && (
              <MenuOptions
                handleShowModal={handleShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth
          handleCloseModal={handleCloseModal}
          setTitleModal={setTitleModal}
        />
      </BasicModal>
    </div>
  );
}

const MenuPlatforms = (props) => {
  const { platforms } = props;

  return (
    <MenuSR>
      {map(platforms, (platform) => (
        <Link
          href={`/games/${platform.attributes.url}`}
          key={platform.id}
          passHref
        >
          <MenuSR.Item as="a" name={platform.attributes.url}>
            {platform.attributes.title}
          </MenuSR.Item>
        </Link>
      ))}
    </MenuSR>
  );
};

const MenuOptions = (props) => {
  const { handleShowModal, user, logout } = props;
  const { productsCart } = useCart();

  return (
    <MenuSR>
      {user ? (
        <>
          <Link href="/orders" passHref>
            <MenuSR.Item as="a">
              <Icon name="game" />
              Mis pedidos
            </MenuSR.Item>
          </Link>
          <Link href="/wishlist" passHref>
            <MenuSR.Item as="a">
              <Icon name="heart outline" />
              Mis favoritos
            </MenuSR.Item>
          </Link>
          <Link href="/account" passHref>
            <MenuSR.Item as="a">
              <Icon name="user outline" />
              {`${user.name} ${user.lastname}`}
            </MenuSR.Item>
          </Link>
          <Link href="/cart" passHref>
            <MenuSR.Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </MenuSR.Item>
          </Link>
          <MenuSR.Item onClick={logout} className="m-0">
            <Icon name="power off" />
          </MenuSR.Item>
        </>
      ) : (
        <MenuSR.Item onClick={handleShowModal}>
          <Icon name="user outline" />
          Mi cuenta
        </MenuSR.Item>
      )}
    </MenuSR>
  );
};
