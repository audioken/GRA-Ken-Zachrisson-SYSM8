import "./ItemCard.css";

function ItemCard({ name, image, price, description }) {
  return (
    <div className="item-card">
      <div className="img-container">
        <img src={image} alt={name} className="item-img" />
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
      <div className="item-info-full">
        <div className="item-top-info">
          <h3 className="item-name">{name}</h3>
          <button className="add-to-favourites-btn">
            <i class="fa-regular fa-heart fav-icon"></i>
          </button>
        </div>
        <div className="item-middle-bottom-container">
          <div className="item-middle-info">
            <span className="price">${price}</span>
          </div>
          <div className="item-bottom-info">
            <p className="item-description truncated-text">{description}</p>
            <button className="expand-icon-container">
              <i class="fa-solid fa-chevron-down expand-icon"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
