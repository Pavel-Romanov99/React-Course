import CatalogItem from "./CatalogItem";

export default function Catalog({ games }) {
  return (
    <section id="catalog-page">
      <h1>All Games</h1>

      {games &&
        games.map((x) => <CatalogItem key={x._id} {...x}></CatalogItem>)}

      {!games && <h3 className="no-articles">No articles yet</h3>}
    </section>
  );
}
