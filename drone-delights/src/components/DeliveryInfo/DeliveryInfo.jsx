import "./DeliveryInfo.css";
import { useAuth } from "../../context/AuthContext";
import { DeliveryContext } from "../../context/DeliveryContext";
import { useContext, useEffect } from "react";
import axios from "axios";

function DeliveryInfo({ className = "", onSubmit }) {
  const { user, token, login } = useAuth();
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);

  useEffect(() => {
    // Om deliveryInfo är tomt och användaren är inloggad, förifyll
    if (user && (!deliveryInfo || Object.keys(deliveryInfo).length === 0)) {
      setDeliveryInfo({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        postalCode: user.postalCode || "",
        city: user.city || "",
      });
    }
  }, [user, deliveryInfo, setDeliveryInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    setDeliveryInfo(data);

    const saveAddressChecked = event.target.saveAddress.checked;

    // Spara till användarprofil om inloggad och checkboxen är ibockad
    if (user && saveAddressChecked) {
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_API_URL}/users/me`,
          {
            name: data.name,
            phone: data.phone,
            address: data.address,
            postalCode: data.postalCode,
            city: data.city,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Uppdatera user i AuthContext så att nya adressen finns direkt i appen
        login(token, res.data.user);

        // Synka deliveryInfo med nya user-data direkt
        setDeliveryInfo({
          name: res.data.user.name || "",
          phone: res.data.user.phone || "",
          address: res.data.user.address || "",
          postalCode: res.data.user.postalCode || "",
          city: res.data.user.city || "",
          saveAddress: true,
        });
      } catch (err) {
        console.error("Kunde inte spara adress till profil", err);
      }
    }

    if (onSubmit) {
      onSubmit();
    }
    console.log("Delivery Information:", data);
  };

  return (
    <div className={`delivery-info-container ${className}`}>
      <div className="delivery-info-header">
        <h2 className="delivery-info-title">Delivery Info</h2>
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
              value={deliveryInfo.name || ""}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, name: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={deliveryInfo.phone || ""}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })
              }
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
            value={deliveryInfo.address || ""}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
            }
          />
        </div>
        <div className="postal-code-and-city-container">
          <div className="form-group">
            <label htmlFor="postalCode">Zip Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              required
              value={deliveryInfo.postalCode || ""}
              onChange={(e) =>
                setDeliveryInfo({
                  ...deliveryInfo,
                  postalCode: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={deliveryInfo.city || ""}
              onChange={(e) =>
                setDeliveryInfo({ ...deliveryInfo, city: e.target.value })
              }
            />
          </div>
          <button className="submit-btn-delivery" type="submit">
            <i className="fa-solid fa-arrow-right submit-arrow"></i>
          </button>
        </div>
        <div className="save-address-checkbox">
          <input
            type="checkbox"
            id="saveAddress"
            name="saveAddress"
            checked={!!deliveryInfo.saveAddress}
            onChange={(e) =>
              setDeliveryInfo({
                ...deliveryInfo,
                saveAddress: e.target.checked,
              })
            }
          />
          <label htmlFor="saveAddress">Save address</label>
        </div>
      </form>
    </div>
  );
}

export default DeliveryInfo;
