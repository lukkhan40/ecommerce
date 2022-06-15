import { useState, useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { useRouter } from "next/router";
import { getGameByUrlAPI } from "../api/game";
import HeaderGame from "../components/Game/HeaderGame";
import TabsGame from "../components/Game/TabsGame";
import Seo from "../components/Seo";

export default function Game() {
  const { query } = useRouter();
  const [game, setGame] = useState(null);

  const getGameByUrl = async () => {
    if (query.game) {
      const resGetGameByUrl = await getGameByUrlAPI();
      const currentGame = resGetGameByUrl.data.filter((game) => {
        if (game.attributes.url === query.game) return game;
      });
      setGame({ ...currentGame[0].attributes, id: currentGame[0].id });
    }
  };

  useEffect(() => {
    getGameByUrl();
  }, [query]); //eslint-disable-line

  if (!game) return null;

  return (
    <BasicLayout className="game">
      <Seo title={game.title} />
      <HeaderGame game={game} />
      <TabsGame game={game} />
    </BasicLayout>
  );
}
