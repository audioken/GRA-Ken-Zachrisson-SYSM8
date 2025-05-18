import "./CategoryFilter.css";
import { useState } from "react";

function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["All", "Food", "Desserts", "Drinks", "Favorites"];

  function getButtonClass(category, selectedCategory) {
    return `category-btn ${selectedCategory === category && selectedCategory !== "Favorites" ? "selected" : ""}`;
  }
  
  function getIconClass(category, selectedCategory) {
    return `fa-heart ${
      selectedCategory === category ? "fa-solid fav-selected" : "fa-regular"
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
