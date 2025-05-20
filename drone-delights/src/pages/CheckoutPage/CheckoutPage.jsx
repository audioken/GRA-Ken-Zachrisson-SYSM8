import "./CheckoutPage.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import TotalPrice from "../../components/TotalPrice/TotalPrice";
import ButtonLink from "../../components/ButtonLink/ButtonLink";

function CheckoutPage() {
  return (
    <div className="checkout-page-container">
      <PageHeader pageTitleBlue={"Finally"} pageTitleRed="Checkout!" />
      <TotalPrice />
      <ButtonLink path={"/"} style={"full"} text={"See Menu"}/>
      <ButtonLink path={"/"} style={"lite"} text={"See Menu"}/>
      <ButtonLink path={"/"} style={"return"} text={"See Menu"}/>
    </div>
  );
}

export default CheckoutPage;
