import "./MenuList.css";
import useFetch from "../../hooks/useFetch";
import ItemCard from "../ItemCard/ItemCard";
import Masonry from "react-masonry-css";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { CartContext } from "../../context/CartContext";

function MenuList() {
  const { data, loading, error } = useFetch("http://localhost:3001/items");
  const { selectedCategory } = useContext(CategoryContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading items.</p>;
  if (!data) return null;

  const filteredItems = data?.filter((item) => {
    if (selectedCategory === "Favorites") {
      return item.isFavorite === true;
    } else {
      return (
        item.category === selectedCategory.toLowerCase() ||
        selectedCategory === "All"
      );
    }
  });

  const getBreakpointCols = () => {
    const count = filteredItems.length;
    console.log(count);
    if (count >= 4) return { default: 4, 1100: 3, 700: 2 };
    if (count === 3) return { default: 3, 700: 2 };
    if (count === 2) return { default: 2 };
    return { default: 1 };
  };

  return (
    <div className="menu-list-container">
      <Masonry
        breakpointCols={getBreakpointCols()}
        className="item-cards-container"
        columnClassName="item-cards-column"
      >
        {filteredItems.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </Masonry>
    </div>
  );
}

export default MenuList;
