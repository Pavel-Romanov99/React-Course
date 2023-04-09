import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as gameService from "../services/gamesService";
import * as commentService from "../services/commentsService";

import CommentForm from "./CommentForm";
import Comment from "./Comment";

export default function Details({ onGameDelete }) {
  const [gameDetails, setGamesDetails] = useState({
    title: "",
    category: "",
    maxLevel: "",
    summary: "",
    imgUrl: "",
  });
  const [gameComments, setGameComments] = useState([]);

  const { gameId } = useParams();

  useEffect(() => {
    commentService.getAllComments().then((res) => {
      const result = res.filter((x) => x.gameId === gameId);
      setGameComments(result);
    });
  }, [gameId]);

  useEffect(() => {
    gameService.getGameById(gameId).then((res) => setGamesDetails(res));
  }, [gameId]);

  const onCreateComment = async (newComment) => {
    const comment = await commentService.createComment(newComment);

    setGameComments((current) => [...current, comment]);
  };

  const onDelete = (e) => {
    e.preventDefault();
    console.log("clicked");
    onGameDelete(gameId);
  };

  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">
        <div className="game-header">
          <img className="game-img" src={gameDetails.imgUrl} />
          <h1>{gameDetails.title}</h1>
          <span className="levels">{gameDetails.maxLevel}</span>
          <p className="type">{gameDetails.category}</p>
        </div>

        <p className="text">{gameDetails.summary}</p>

        <div className="details-comments">
          <h2>Comments:</h2>
          <ul>
            {gameComments &&
              gameComments.map((x) => <Comment key={x._id} {...x}></Comment>)}
          </ul>
          {!gameComments && <p className="no-comment">No comments.</p>}
        </div>

        <div className="buttons">
          <a className="button">Edit</a>
          <a className="button" onClick={onDelete}>
            Delete
          </a>
        </div>
      </div>

      <CommentForm onCreateComment={onCreateComment}></CommentForm>
    </section>
  );
}
