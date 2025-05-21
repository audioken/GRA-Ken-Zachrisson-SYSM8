import "./DeliveryInfo.css";
import { DeliveryContext } from "../../context/DeliveryContext";
import { useContext } from "react";

function DeliveryInfo({ className = "", onSubmit }) {
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    setDeliveryInfo(data);
    if (onSubmit) {
      onSubmit();
    }
    console.log("Delivery Information:", data);
  };

  return (
    <div className={`delivery-info-container ${className}`}>
      <div className="delivery-info-header">
        <h2 className="delivery-info-title">Delivery Information</h2>
      </div>
      <form className="delivery-info-form" onSubmit={handleSubmit}>
        <div className="name-and-phone-container">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              defaultValue={deliveryInfo.name || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              defaultValue={deliveryInfo.phone || ""}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            required
            defaultValue={deliveryInfo.address || ""}
          />
        </div>
        <div className="postal-code-and-city-container">
          <div className="form-group">
            <label htmlFor="postal-code">Zip Code</label>
            <input
              type="text"
              id="postal-code"
              name="postal-code"
              required
              defaultValue={deliveryInfo["postal-code"] || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              required
              defaultValue={deliveryInfo.city || ""}
            />
          </div>
          <button className="submit-btn-delivery" type="submit">
            <i className="fa-solid fa-arrow-right submit-arrow"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeliveryInfo;
