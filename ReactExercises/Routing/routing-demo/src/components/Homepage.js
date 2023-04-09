import jumbotronImage from "./images/four_slider_img01.png";

import Game from "./Game";

export default function Homepage({ games }) {
  return (
    <section id="welcome-world">
      <div className="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
      </div>
      <img src={jumbotronImage} alt="hero" />

      <div id="home-page">
        <h1>Latest Games</h1>

        {Array.isArray(games) && games.map((x) => <Game key={x._id} {...x} />)}

        {!Array.isArray(games) && <p className="no-articles">No games yet</p>}
      </div>
    </section>
  );
}
