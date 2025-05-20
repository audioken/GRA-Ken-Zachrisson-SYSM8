import "./Payment.css";
import { DeliveryContext } from "../../context/DeliveryContext";
import { useContext } from "react";

function Payment() {
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    setDeliveryInfo(data);
    console.log("Delivery Information:", data);
  };

  return (
    <div className="payment-info-container">
      <h2 className="payment-info-title">Payment</h2>
      <form className="payment-info-form" onSubmit={handleSubmit}>
        <div className="name-and-phone-container">
          <div className="form-group">
            <label htmlFor="name">Name On Card</label>
            <input
              type="text"
              id="nameOnCard"
              name="name"
              required
              //   defaultValue={deliveryInfo.name || ""}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
            //   defaultValue={deliveryInfo.phone || ""}
            />
          </div> */}
        </div>
        <div className="form-group">
          <label htmlFor="card">Card Number</label>
          <input
            type="text"
            id="card"
            name="card"
            placeholder="xxxx-xxxx-xxxx-xxxx"
            required
            // defaultValue={deliveryInfo.address || ""}
          />
        </div>
        <div className="postal-code-and-city-container">
          <div className="form-group">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              placeholder="MM/YY"
              required
              //   defaultValue={deliveryInfo["postal-code"] || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvc">CVC Number</label>
            <input
              type="text"
              id="cvc"
              name="cvc"
              placeholder="xxx"
              required
              //   defaultValue={deliveryInfo.city || ""}
            />
          </div>
          <button className="submit-btn" type="submit">
            <i className="fa-solid fa-arrow-right submit-arrow"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
