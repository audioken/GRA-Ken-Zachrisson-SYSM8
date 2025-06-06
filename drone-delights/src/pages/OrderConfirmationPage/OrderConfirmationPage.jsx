import "./OrderConfirmationPage.css";
import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import OrderConfirmation from "../../components/Order/OrderConfirmation/OrderConfirmation";
import ButtonLink from "../../components/UI/Button/ButtonLink";

function OrderConfirmationPage() {
  return (
    <div className="order-confirmation-page-container">
      <TitleHeader pageTitleBlue={"Order"} pageTitleRed="Confirmation!" />
      <div className="order-confirmation-body">
        <OrderConfirmation />
        <div className="order-confirmation-btns">
          <ButtonLink
            path="/menu"
            style="return"
            text="Continue Shopping"
            onClick={() => sessionStorage.removeItem("lastOrder")}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
