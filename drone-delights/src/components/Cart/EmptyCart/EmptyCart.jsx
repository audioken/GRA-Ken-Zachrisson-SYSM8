import "./EmptyCart.css";
import ButtonLink from "../../UI/Button/ButtonLink";

function EmptyCart() {
  const smiley = ":(";

  return (
    <div className="empty-cart-container">
      <div className="empty-cart-text-container">
        <p className="empty-cart-line">
          <span className="empty-cart-text-blue">No food in cart</span>
        </p>
        <p className="empty-cart-line">
          <span className="empty-cart-text-blue no-food">No food</span>{" "}
          <span className="empty-cart-text-blue">in</span>{" "}
          <span className="empty-cart-text-red">belly</span>{" "}
          <span className="empty-cart-text-red smiley">{smiley}</span>{" "}
        </p>
      </div>
      <ButtonLink path="/menu" style="full" text="See Menu" />
    </div>
  );
}

export default EmptyCart;
