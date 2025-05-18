import "./MenuList.css";
import useFetch from "../../hooks/useFetch";
import ItemCard from "../ItemCard/ItemCard";
import Masonry from "react-masonry-css";

function MenuList() {
  const { data, loading, error } = useFetch("http://localhost:3001/items");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading items.</p>;
  if (!data) return null;

  const items = data;

  return (
    <div className="menu-list-container">
      <Masonry
        breakpointCols={{
          default: 4,
          1100: 3,
          700: 2,
        }}
        className="item-cards-container"
        columnClassName="item-cards-column"
      >
        {items.map((item) => (
          <ItemCard
            key={item.id}
            image={item.img}
            name={item.name}
            price={item.price}
            description={item.description}
          />
        ))}
      </Masonry>
    </div>
  );
}

export default MenuList;
