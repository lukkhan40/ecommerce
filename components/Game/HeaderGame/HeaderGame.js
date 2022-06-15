import { useState, useEffect } from "react";
import { Grid, Image, Icon, Button } from "semantic-ui-react";
import { size } from "lodash";
import classNames from "classnames";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import {
  isFavoriteAPI,
  addFavoriteAPI,
  deleteFavoriteAPI,
} from "../../../api/favorite";

export default function HeaderGame(props) {
  const { game } = props;

  return (
    <Grid className="header-game">
      <Grid.Column mobile={16} tablet={6} computer={5}>
        <Image src={game.poster?.url} alt={game.title} fluid />
      </Grid.Column>
      <Grid.Column mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </Grid.Column>
    </Grid>
  );
}

const Info = (props) => {
  const { game } = props;
  const { title, summary, price, discount, url } = game;
  const [isFavorite, setIsFavorite] = useState(false);
  const [reloadFavorite, setReloadFavorite] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();

  const favorite = async () => {
    if (auth) {
      //Strapi no arroja los valores correctos
      const resIsFavorite = await isFavoriteAPI(auth.idUser, game.id, logout);
      size(resIsFavorite.data) > 0 ? setIsFavorite(true) : setIsFavorite(false);
    }
  };

  useEffect(() => {
    favorite();
    setReloadFavorite(false);
  }, [game, reloadFavorite]); // eslint-disable-line

  const addFavorite = async () => {
    if (auth) {
      const resAddFavorite = await addFavoriteAPI(auth.idUser, game.id, logout);
      setReloadFavorite(true);
    }
  };

  const deleteFavorite = async () => {
    if (auth) {
      const resDeleteFavorite = await deleteFavoriteAPI(
        auth.idUser,
        game.id,
        logout
      );

      setReloadFavorite(true);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {title}
        <Icon
          name={isFavorite ? "heart" : "heart outline"}
          className={classNames({
            like: isFavorite,
          })}
          link
          onClick={isFavorite ? deleteFavorite : addFavorite}
        />
      </div>
      <div className="header-game__delivery">Entrega en 24/48h</div>
      <div
        className="header-game__summary"
        dangerouslySetInnerHTML={{ __html: summary }}
      />
      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico: ${price}</p>
          <div className="header-game__buy-price-actions">
            <p>-{discount}%</p>
            <p>${(price - Math.floor(price * discount) / 100).toFixed(2)}</p>
          </div>
        </div>
        <Button
          className="header-game__buy-btn"
          onClick={() => addProductCart(url)}
        >
          Comprar
        </Button>
      </div>
    </>
  );
};
