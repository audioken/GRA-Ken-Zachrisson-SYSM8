import "./MostOrderedList.css";
import ItemCard from "../../Menu/ItemCard/ItemCard";
import useFetch from "../../../hooks/useFetch";
import Masonry from "react-masonry-css";

function MostOrderdList() {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/items`
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading items.</p>;
  if (!data) return null;

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
            <ItemCard key={item._id} {...item} />
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default MostOrderdList;
