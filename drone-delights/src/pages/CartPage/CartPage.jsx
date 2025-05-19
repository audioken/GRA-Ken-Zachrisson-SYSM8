import "./CartPage.css";
import CartList from "../../components/CartList/CartList";
import PageHeader from "../../components/PageHeader/PageHeader";

function CartPage() {
  return (
    <div className="cart-page-container">
      <PageHeader pageTitleBlue="Your" pageTitleRed="Cart!" />
      <CartList />
    </div>
  );
}

export default CartPage;
