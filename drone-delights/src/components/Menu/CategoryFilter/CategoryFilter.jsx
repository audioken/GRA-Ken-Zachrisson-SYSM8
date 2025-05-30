import "./CategoryFilter.css";
import { useContext } from "react";
import { CategoryContext } from "../../../context/CategoryContext";

function CategoryFilter() {
  const { categories, selectedCategory, setSelectedCategory } = useContext(CategoryContext);

  function getButtonClass(category, selectedCategory) {
    return `category-btn ${
      selectedCategory === category && selectedCategory !== "Favorites"
        ? "selected"
        : ""
    }`;
  }

  function getIconClass(category, selectedCategory) {
    return `fa-heart ${
      selectedCategory === category ? "fa-solid fav-filter-selected" : "fa-regular"
    }`;
  }

  return (
      <div className="category-filter-container">
        {categories.map((category) => (
          <button
            key={category}
            className={getButtonClass(category, selectedCategory)}
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

export default CategoryFilter;
