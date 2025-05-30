import "./MenuList.css";
import useFetch from "../../../hooks/useFetch";
import ItemCard from "../ItemCard/ItemCard";
import Masonry from "react-masonry-css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../context/CategoryContext";
import { useAuth } from "../../../context/AuthContext";

function MenuList() {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/items`
  );
  const { selectedCategory } = useContext(CategoryContext);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory === "Favorites" && !token) {
      navigate("/register");
    }
  }, [selectedCategory, token, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading items.</p>;
  if (!data) return null;

  const filteredItems = data?.filter((item) => {
    if (selectedCategory === "Favorites") {
      return user?.favourites?.includes(item._id);
    } else {
      return (
        item.category === selectedCategory.toLowerCase() ||
        selectedCategory === "All"
      );
    }
  });

  const getBreakpointCols = () => {
    const count = filteredItems.length;
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
          <ItemCard key={item._id} {...item} />
        ))}
      </Masonry>
    </div>
  );
}

export default MenuList;
