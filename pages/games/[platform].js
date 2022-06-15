import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../../layouts/BasicLayout";
import { getGamesPlatformAPI } from "../../api/game";
import ListGames from "../../components/ListGames";
import Pagination from "../../components/Pagination";

export default function Platform() {
  const { query } = useRouter();
  const limitPerPage = 10;
  const [games, setGames] = useState(null);
  const [totalGames, setTotalGames] = useState(0);

  const getStartItem = () => {
    const currenPages = parseInt(query.page);
    if (!query.page || currenPages === 1) return 0;
    else return currenPages * limitPerPage - limitPerPage;
  };

  //Ya que los parametros para Strapi no funcionan, se filtra desde el cliente
  const filterGames = (games) => {
    const filteredGames = games.filter((game) => {
      const url = game.attributes.url;
      const splitArray = url.split("-");
      const currentPlatform = splitArray[splitArray.length - 1];

      if (query.platform === currentPlatform) return game;
    });
    return filteredGames;
  };

  const getGamesPlatform = async () => {
    if (query.platform) {
      const resGetGamesPlatformAPI = await getGamesPlatformAPI(
        query.platform,
        limitPerPage,
        getStartItem()
      );
      const currentGames = filterGames(resGetGamesPlatformAPI.data);
      setTotalGames(currentGames.length);
      setGames(currentGames);
    }
  };

  useEffect(() => {
    getGamesPlatform();
  }, [query]); //eslint-disable-line

  return (
    <BasicLayout className="platform">
      {!games && <Loader active>Cargando juegos</Loader>}
      {games && size(games) === 0 && (
        <div className="data__not-found">
          <h3>No hay juegos</h3>
        </div>
      )}
      {size(games) > 0 && <ListGames games={games} />}
      {totalGames ? (
        <Pagination
          totalGames={totalGames}
          page={query.page ? parseInt(query.page) : 1}
          limitPerPage={limitPerPage}
        />
      ) : null}
    </BasicLayout>
  );
}
