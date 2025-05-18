import "./FoodCard.css";
import foodImg from "../../assets/images/food/burger.jpg";

function FoodCard({ image, name, price, description }) {
  return (
    <div className="food-card">
      <div className="img-container">
        <img src={foodImg} alt={name} className="food-img" />
        <div className="items-count-container">
          <div className="trash-minus-container">
            <button className="trash-btn counter-btn">
              <i class="fa-solid fa-trash counter-icon trash-icon"></i>
            </button>
            <button className="minus-btn counter-btn">
              <i class="fa-solid fa-minus counter-icon minus-icon"></i>
            </button>
          </div>
          <div className="count-container">
            <span className="count">1</span>
          </div>
          <div className="plus-btns-container">
            <button className="plus-btn counter-btn">
              <i class="fa-solid fa-plus counter-icon plus-icon"></i>
            </button>
          </div>
        </div>
        <button className="plus-btn-alone counter-btn">
          <i class="fa-solid fa-plus counter-icon plus-icon"></i>
        </button>
      </div>
      <div className="food-info-full">
        <div className="food-top-info">
          <h3 className="food-name">Delicious Burger</h3>
          <button className="add-to-favourites-btn">
            <i class="fa-regular fa-heart fav-icon"></i>
          </button>
        </div>
        <div className="food-middle-bottom-container">
          <div className="food-middle-info">
            <span className="price">$9.99</span>
          </div>
          <div className="food-bottom-info">
            <p className="food-description truncated-text">
              A mouth-watering burger with fresh ingredients and a secret sauce.
            </p>
            <button className="expand-icon-container">
              <i class="fa-solid fa-chevron-down expand-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
