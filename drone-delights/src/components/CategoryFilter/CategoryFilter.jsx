function CategoryFilter() {
    return (
      <div className="food-menu-btn-bar-container">
        <button className="food-menu-btn">All</button>
        <button className="food-menu-btn">Food</button>
        <button className="food-menu-btn">Desserts</button>
        <button className="food-menu-btn">Drinks</button>
        <button className="food-menu-btn">
          <i className="fa-solid fa-heart"></i>
        </button>
      </div>
    );
}

export default CategoryFilter;