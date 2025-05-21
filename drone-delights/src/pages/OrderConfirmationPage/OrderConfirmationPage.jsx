import "./OrderConfirmationPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import OrderConfirmation from "../../components/OrderConfirmation/OrderConfirmation";

function OrderConfirmationPage() {
  return (
    <div className="order-confirmation-page-container">
      <PageHeader pageTitleBlue={"Order"} pageTitleRed="Confirmation!" />
      <OrderConfirmation />
    </div>
  );
}

export default OrderConfirmationPage;
