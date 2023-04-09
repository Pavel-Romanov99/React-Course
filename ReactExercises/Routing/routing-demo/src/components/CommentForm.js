import { useState } from "react";
import { useParams } from "react-router-dom";

export default function CommentForm({ onCreateComment }) {
  const { gameId } = useParams();
  const [comment, setComment] = useState("");

  const onCommentChange = (e) => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();

    const newComment = {
      gameId: gameId,
      comment: comment,
    };

    onCreateComment(newComment);
    setComment("");
  };

  return (
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" onSubmit={commentSubmitHandler}>
        <textarea
          name="comment"
          placeholder="Comment......"
          value={comment}
          onChange={onCommentChange}
        ></textarea>
        <input className="btn submit" type="submit" />
      </form>
    </article>
  );
}
