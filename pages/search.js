import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/dist/client/router";
import { size } from "lodash";
import { searchGamesAPI } from "../api/game";
import BasicLayout from "../layouts/BasicLayout";
import ListGames from "../components/ListGames";
import Seo from "../components/Seo";

export default function Search() {
  const [games, setGames] = useState(null);
  const { query } = useRouter();

  useEffect(() => {
    document.getElementById("search-game").focus();
  }, []);

  const searchGames = async () => {
    if (size(query.query) > 0) {
      const resSearchGames = await searchGamesAPI(query.query);

      size(resSearchGames.data) > 0
        ? setGames(resSearchGames.data)
        : setGames([]);
    } else {
      setGames([]);
    }
  };

  useEffect(() => {
    searchGames();
  }, [query]); // eslint-disable-line

  return (
    <BasicLayout className="search">
      <Seo title={`Buscando: ${query.query}`} />
      {!games && <Loader active>Buscando Juegos</Loader>}
      {games && size(games) === 0 && (
        <div>
          <h3>No se han encontrado juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
    </BasicLayout>
  );
}
