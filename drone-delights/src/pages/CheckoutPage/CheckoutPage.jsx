import "./CheckoutPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import TotalPrice from "../../components/TotalPrice/TotalPrice";
import DeliveryInfo from "../../components/DeliveryInfo/DeliveryInfo";
import Payment from "../../components/Payment/Payment";
import ButtonLink from "../../components/ButtonLink/ButtonLink";
import { useState, useEffect } from "react";

function CheckoutPage() {
  useEffect(() => {
    sessionStorage.removeItem("orderSent");
  }, []);
  const [currentView, setCurrentView] = useState("delivery");

  return (
    <div className="checkout-page-container">
      <PageHeader pageTitleBlue={"Finally"} pageTitleRed={"Checkout!"} />
      <div className="checkout-page-body">
        <TotalPrice />
        <DeliveryInfo
          className={`delivery-view ${currentView === "payment" ? "hide" : ""}`}
          onSubmit={() => setCurrentView("payment")}
        />
        <Payment
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
