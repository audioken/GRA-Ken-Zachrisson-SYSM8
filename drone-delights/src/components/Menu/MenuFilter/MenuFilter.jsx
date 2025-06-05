import "./MenuFilter.css";
import { useContext } from "react";
import { CategoryContext } from "../../../context/CategoryContext";

function MenuFilter() {
  const { categories, selectedCategory, setSelectedCategory } =
    useContext(CategoryContext);

  // Hanterar klassen för knapparna baserat på vald kategori
  function getButtonClass(category, selectedCategory) {
    return `category-btn ${
      selectedCategory === category && selectedCategory !== "Favorites"
        ? "selected"
        : "hl-filter"
    }`;
  }

  // Hanterar ikonen för "Favorites" baserat på vald kategori
  function getIconClass(category, selectedCategory) {
    return `fa-heart ${
      selectedCategory === category
        ? "fa-solid fav-filter-selected"
        : "fa-regular"
    }`;
  }

  return (
    <div className="category-filter-container">
      {categories.map((category) => (
        <button
          key={category}
          className={`${getButtonClass(category, selectedCategory)}`}
          onClick={() => setSelectedCategory(category)}
        >
          {category === "Favorites" ? (
            <i className={getIconClass(category, selectedCategory)}></i>
          ) : (
            category
          )}
        </button>
      ))}
    </div>
  );
}

export default MenuFilter;
