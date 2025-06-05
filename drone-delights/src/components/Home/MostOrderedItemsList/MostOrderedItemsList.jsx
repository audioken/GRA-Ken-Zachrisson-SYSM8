import "./MostOrderedItemsList.css";
import MenuItemCard from "../../Menu/MenuItemCard/MenuItemCard";
import useFetch from "../../../hooks/useFetch";
import Masonry from "react-masonry-css";

function MostOrderedItemsList() {
  // Anpassad hook för att hämta data från API:et
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/items`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading items.</p>;
  if (!data) return null;

  // Filtrera de mest beställda varorna (hårdkodat för tillfället)
  const mostOrderedItems = data.filter((item) => item.isMostOrdered === true);

  return (
    <div className="most-ordered-container">
      <h2 className="most-ordered-title">Most Ordered</h2>
      <div className="most-ordered-item-cards-container-scroll">
        <Masonry
          breakpointCols={{ default: 4 }}
          className="most-ordered-item-cards-container"
          columnClassName="most-ordered-item-cards-column"
        >
          {mostOrderedItems.map((item) => (
            <MenuItemCard key={item._id} {...item} />
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default MostOrderedItemsList;
