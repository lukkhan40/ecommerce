import { useState, useEffect } from "react";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getLastGamesAPI } from "../api/game";
import { Loader } from "semantic-ui-react";
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";

export default function Home() {
  const [games, setGames] = useState(null);

  const getLastGames = async () => {
    const resGetLastGamesAPI = await getLastGamesAPI(50);

    if (size(resGetLastGamesAPI) > 0) setGames(resGetLastGamesAPI.data);
    else setGames([]);
  };

  useEffect(() => {
    getLastGames();
  }, []);

  return (
    <BasicLayout className="home">
      <Seo title="Principal" />
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
