import "./CheckoutPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import TotalPrice from "../../components/TotalPrice/TotalPrice";
import DeliveryInfo from "../../components/DeliveryInfo/DeliveryInfo";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

function CheckoutPage() {
  return (
    <div className="checkout-page-container">
      <PageHeader pageTitleBlue={"Finally"} pageTitleRed="Checkout!" />
      <div className="checkout-page-body">
        <TotalPrice />
        <DeliveryInfo />
        <div className="checkout-page-btns">
          <ButtonLink path={"/cart"} style={"return"} text={"Return to Cart"} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
