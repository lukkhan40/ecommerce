import { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { size, forEach } from "lodash";
import { getFavoriteAPI } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import { Loader } from "semantic-ui-react";
import ListGames from "../components/ListGames";

export default function Wishlist() {
  const [games, setGames] = useState(null);
  const { auth, logout } = useAuth();

  const getFavorite = async () => {
    const resGetFavorite = await getFavoriteAPI(auth.idUser, logout);

    setGames(resGetFavorite.data);

    if (size(resGetFavorite.data) > 0) {
      let gameArray = [];
      forEach(resGetFavorite.data, (data) => {
        gameArray.push(data.game);
      });
      if (!gameArray[0]) gameArray = [];
      setGames(gameArray);
    } else setGames([]);
  };

  useEffect(() => {
    getFavorite();
  }, []); //eslint-disable-line

  return (
    <BasicLayout className="wishlist">
      <div className="wishlist__block">
        <div className="title">Lista de deseos</div>
        <div className="data">
          {!games && <Loader active>Cargando juegos</Loader>}
          {games && size(games) === 0 && (
            <div>
              <h3>No tienes ningun juego en tu lista de favoritos</h3>
            </div>
          )}
          {size(games) > 0 && <ListGames games={games} />}
        </div>
      </div>
    </BasicLayout>
  );
}
