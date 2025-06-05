import "./MenuItemsList.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../context/CategoryContext";
import { useAuth } from "../../../context/AuthContext";
import useFetch from "../../../hooks/useFetch";
import Masonry from "react-masonry-css";
import ItemCard from "../MenuItemCard/MenuItemCard";
import NoFavourites from "../NoFavourites/NoFavourites";

function MenuItemsList() {
  const navigate = useNavigate();
  const { selectedCategory } = useContext(CategoryContext);
  const { user, token } = useAuth();

  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API_URL}/items`
  );

  // Om användaren inte är inloggad men har valt "Favorites" → skicka till login
  useEffect(() => {
    if (selectedCategory === "Favorites" && !token) {
      navigate("/login");
    }
  }, [selectedCategory, token, navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading items.</p>;
  if (!data) return null;

  // Filtrera utifrån kategori eller favoriter
  const filteredItems = data.filter((item) => {
    if (selectedCategory === "Favorites") {
      return user?.favourites?.includes(item._id);
    }

    return (
      selectedCategory === "All" ||
      item.category === selectedCategory.toLowerCase()
    );
  });

  // Visa ett specialmeddelande om inga favoriter finns
  if (
    selectedCategory === "Favorites" &&
    (!user?.favourites || user.favourites.length === 0)
  ) {
    return <NoFavourites />;
  }

  // Responsiva kolumner beroende på antal objekt
  const getBreakpointCols = () => {
    const count = filteredItems.length;
    if (count >= 4) return { default: 4, 1100: 3, 850: 2, 500: 1 };
    if (count === 3) return { default: 3, 850: 2, 500: 1 };
    if (count === 2) return { default: 2, 500: 1 };
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

export default MenuItemsList;

