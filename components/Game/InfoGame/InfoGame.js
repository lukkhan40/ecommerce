import ReactPlayer from "react-player/lazy";
import CarouselScreenShots from "../CarouselScreenShots";

export default function InfoGame(props) {
  const { game } = props;

  return (
    <div className="info-game">
      <ReactPlayer className="info-game__video" url={game.video} controls />
      <CarouselScreenShots title={game.title} screenshots={game.screenshots} />
      <div className="info-game__content">
        <div dangerouslySetInnerHTML={{ __html: game.summary }} />
        <div className="info-game__content-date">
          <h4>Fecha de lanzamiento</h4>
          <p>{game.releaseDate}</p>
        </div>
      </div>
    </div>
  );
}
