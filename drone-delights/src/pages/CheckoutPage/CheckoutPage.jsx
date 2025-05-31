import "./CheckoutPage.css";
import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import TotalPrice from "../../components/Shared/TotalPrice/TotalPrice";
import CheckoutDeliveryForm from "../../components/Checkout/CheckoutDeliveryForm";
import CheckoutPaymentForm from "../../components/Checkout/CheckoutPaymentForm";
import ButtonLink from "../../components/UI/Button/ButtonLink";
import { useState, useEffect } from "react";

function CheckoutPage() {
  useEffect(() => {
    sessionStorage.removeItem("orderSent");
  }, []);

  const [currentView, setCurrentView] = useState("delivery");

  return (
    <div className="checkout-page-container">
      <TitleHeader pageTitleBlue={"Finally"} pageTitleRed={"Checkout!"} />
      <div className="checkout-page-body">
        <TotalPrice />
        <CheckoutDeliveryForm
          className={`delivery-view ${currentView === "payment" ? "hide" : ""}`}
          onSubmit={() => setCurrentView("payment")}
        />
        <CheckoutPaymentForm
          className={`payment-view ${currentView === "delivery" ? "hide" : ""}`}
        />
        <div className="checkout-page-btns">
          <ButtonLink
            path={"/cart"}
            style={"return"}
            text={"Cart"}
            className={`${currentView === "payment" ? "hide" : ""}`}
          />
          <ButtonLink
            path={"/checkout"}
            style={"return"}
            text={"Delivery Information"}
            onClick={() => setCurrentView("delivery")}
            className={`${currentView === "delivery" ? "hide" : ""}`}
          />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
