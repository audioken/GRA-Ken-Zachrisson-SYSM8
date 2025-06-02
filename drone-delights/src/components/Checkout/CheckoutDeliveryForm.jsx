import "../../styles/DeliveryStyles.css";
import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { DeliveryContext } from "../../context/DeliveryContext";
import { validateInputs } from "../../utils/validateInputs";
import useIsMobile from "../../hooks/useIsMobile";
import Button from "../UI/Button/Button";
import InputField from "../UI/Input/InputField";
import axios from "axios";

function CheckoutDeliveryForm({ className = "", onSubmit }) {
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
  const { user, token, login } = useAuth();
  const isMobile = useIsMobile(768);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  });

  const [saveAddress, setSaveAddress] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        postalCode: user.postalCode || "",
        city: user.city || "",
      });
    } else {
      setForm({
        name: deliveryInfo.name || "",
        phone: deliveryInfo.phone || "",
        address: deliveryInfo.address || "",
        postalCode: deliveryInfo.postalCode || "",
        city: deliveryInfo.city || "",
      });
    }
    setSaveAddress(false);
  }, [user, deliveryInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
  };

  const handleClear = (field) => {
    const updatedForm = { ...form, [field]: "" };
    setForm(updatedForm);
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, valid } = validateInputs(form);
    setErrors(errors);
    setValid(valid);

    if (!Object.values(valid).every(Boolean)) return;

    setDeliveryInfo({ ...form, saveAddress });

    if (user && saveAddress) {
      try {
        const res = await axios.patch(
          `${process.env.REACT_APP_API_URL}/users/me`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        login(token, res.data.user);
        setDeliveryInfo({ ...form, saveAddress: true });
      } catch (err) {
        console.error("Kunde inte spara adress till profil", err);
      }
    }

    if (onSubmit) onSubmit();
  };

  return (
    <div className={`form-container ${className}`}>
      <div className="form-header">
        <h2 className="form-title">Delivery Info</h2>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-inputs-container">
          <div className="form-inputs-row-container">
            <InputField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
              onClear={() => handleClear("name")}
              error={errors.name}
              valid={valid.name}
            />
            <InputField
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleInputChange}
              onClear={() => handleClear("phone")}
              error={errors.phone}
              valid={valid.phone}
            />
          </div>
          <InputField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            onClear={() => handleClear("address")}
            error={errors.address}
            valid={valid.address}
          />
          <div className="form-inputs-row-container">
            <InputField
              label="Zip Code"
              name="postalCode"
              value={form.postalCode}
              onChange={handleInputChange}
              onClear={() => handleClear("postalCode")}
              error={errors.postalCode}
              valid={valid.postalCode}
            />
            <InputField
              label="City"
              name="city"
              value={form.city}
              onChange={handleInputChange}
              onClear={() => handleClear("city")}
              error={errors.city}
              valid={valid.city}
            />
            {!isMobile && (
              <Button
                className={`${
                  !Object.values(valid).every(Boolean) ? " disabled" : ""
                }`}
                type="submit"
                text={<i className="fa-solid fa-arrow-right submit-arrow"></i>}
                style="add-button-l"
              />
            )}
          </div>
        </div>
        {isMobile && (
          <Button
            className={`${
              !Object.values(valid).every(Boolean) ? " disabled" : ""
            }`}
            type="submit"
            text="Proceed to Payment"
            style="full-green"
          />
        )}
        {user && (
          <div className="save-address-checkbox">
            <input
              type="checkbox"
              id="saveAddress"
              name="saveAddress"
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
            />
            <label htmlFor="saveAddress">Save address</label>
          </div>
        )}
      </form>
    </div>
  );
}

export default CheckoutDeliveryForm;
