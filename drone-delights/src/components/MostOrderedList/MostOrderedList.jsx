import "./MostOrderedList.css";
import ItemCard from "../ItemCard/ItemCard";
import useFetch from "../../hooks/useFetch";

function MostOrderdList() {
  const { data, loading, error } = useFetch("http://localhost:3001/items");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading items.</p>;
  if (!data) return null;

  const mostOrderedItems = data.filter((item) => item.isMostOrdered === true);

  return (
    <div className="most-ordered-container">
      <h2 className="most-ordered-title">Most Ordered</h2>
      <div className="most-ordered-item-cards-container">
        {mostOrderedItems.map((item) => (
          <ItemCard
            key={item.id}
            image={item.img}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}

export default MostOrderdList;
