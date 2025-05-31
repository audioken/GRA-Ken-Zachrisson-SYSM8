import "./CartTotal.css";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import TotalPrice from "../../Shared/TotalPrice/TotalPrice";
import ButtonBar from "../../UI/Button/ButtonBar";

function CartTotal() {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="cart-summary-container">
      <TotalPrice />
      <ButtonBar
        leftPath={"/menu"}
        leftText={"Continue shopping"}
        rightPath={"/checkout"}
        rightText={"Checkout"}
      />
    </div>
  );
}

export default CartTotal;
