import { Link } from "react-router-dom";

export default function CatalogItem({ imageUrl, category, title, _id }) {
  return (
    <div className="allGames">
      <div className="allGames-info">
        <img src={imageUrl} />
        <h6>{category}</h6>
        <h2>{title}</h2>
        <Link className="details-button" to={`/catalog/${_id}`}>
          Details
        </Link>
      </div>
    </div>
  );
}
