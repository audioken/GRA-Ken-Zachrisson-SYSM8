import "./CategoryFilter.css";

function CategoryFilter() {
    return (
      <div className="category-filter-container">
        <button className="category-btn all">All</button>
        <button className="category-btn food">Food</button>
        <button className="category-btn desserts">Desserts</button>
        <button className="category-btn drinks">Drinks</button>
        <button className="category-btn favourites">
          <i className="fa-solid fa-heart"></i>
        </button>
      </div>
    );
}

export default CategoryFilter;