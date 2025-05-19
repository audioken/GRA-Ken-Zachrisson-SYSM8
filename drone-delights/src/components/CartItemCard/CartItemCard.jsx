import "./CartItemCard.css";

function CartItemCard({ item, quantity }) {
    return ( <div className="cart-item-card-container">
        <div className="cart-item-card-image">
            <img src={item.img} alt={item.name} />
        </div>
        <div className="cart-item-card-details">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {quantity}</p>
        </div>
        <div className="cart-item-card-actions">
            <button className="remove-button">Remove</button>
        </div>
    </div> );
}

export default CartItemCard;