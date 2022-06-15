import { map } from "lodash";
import Link from "next/link";
import { Image, Grid } from "semantic-ui-react";
import useWindowSize from "../../hooks/useWindowSize";
import {
  breakpointUpLg,
  breakpointUpMd,
  breakpointUpSm,
  breakpointUpXL,
} from "../../utils/breakpoints";

export default function ListGames(props) {
  const { games } = props;
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    switch (true) {
      case width > breakpointUpXL:
        return 5;
      case width > breakpointUpLg:
        return 4;
      case width > breakpointUpMd:
        return 3;
      case width > breakpointUpSm:
        return 2;
      default:
        return 1;
    }
  };

  return (
    <div className="list-games">
      <Grid>
        <Grid.Row columns={getColumnsRender()}>
          {map(games, (game) => (
            <Game game={game} key={game.id} />
          ))}
        </Grid.Row>
      </Grid>
    </div>
  );
}

const Game = (props) => {
  const { game } = props;

  return (
    <Grid.Column className="list-game__game">
      <Link href={`/${game.attributes.url}`}>
        <a>
          <div className="list-games__game-poster">
            <Image
              src={game.attributes.poster?.url}
              alt={game.attributes.title}
            />
            <div className="list-games__game-poster-info">
              {game.attributes.discount ? (
                <span className="discount">-{game.attributes.discount}%</span>
              ) : (
                <span />
              )}
              <span className="price">${game.attributes.price}</span>
            </div>
          </div>
          <h2>{game.attributes.title}</h2>
        </a>
      </Link>
    </Grid.Column>
  );
};
