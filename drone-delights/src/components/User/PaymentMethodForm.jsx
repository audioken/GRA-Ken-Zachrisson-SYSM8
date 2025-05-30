import "../../styles/FormStyles.css";
import "../../styles/ButtonStyles.css";
import { useState, useEffect } from "react";
import { validateInputs } from "../../utils/validateInputs";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import InputField from "../UI/Input/InputField";

function PaymentMethodForm({ onCancel, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    isPrimary: false,
  });

  const [hovered, setHovered] = useState({
    name: false,
    number: false,
    expiry: false,
    cvc: false,
  });

  const { user, updateUser, token } = useAuth();
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [success, setSuccess] = useState("");
  const [formComplete, setFormComplete] = useState(false);

  const handleCancel = () => {
    setForm({ name: "", number: "", expiry: "", cvc: "" });
    setErrors({});
    setValid({});
    setSuccess("");
    if (onCancel) onCancel();
  };

  const handleClear = (field) => {
    const updatedForm = { ...form, [field]: "" };
    setForm(updatedForm);

    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
  };

  // const handleAddCard = async (cardData) => {
  //   const res = await axios.post(
  //     `${process.env.REACT_APP_API_URL}/users/payment-methods`,
  //     cardData,
  //     { headers: { Authorization: `Bearer ${token}` } }
  //   );
  //   // Hämta nya paymentMethods från backend (eller hela user)
  //   const updatedUser = {
  //     ...user,
  //     paymentMethods: [...user.paymentMethods, cardData],
  //   };
  //   updateUser(updatedUser);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, valid } = validateInputs(form);
    setErrors(errors);
    setValid(valid);

    if (
      !valid.name ||
      !valid.number ||
      !valid.expiry ||
      !valid.cvc
    ) {
      console.log("Fälten är inte giltiga, avbryter inskickningen");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/payment-methods`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Om backend returnerar { user }
      if (res.data.user) {
        updateUser(res.data.user);
      }
      // Om backend returnerar { paymentMethods }
      else if (res.data.paymentMethods) {
        updateUser({ ...user, paymentMethods: res.data.paymentMethods });
      }
      // Fallback om inget returneras (inte rekommenderat)
      else {
        updateUser({
          ...user,
          paymentMethods: [
            ...(user.paymentMethods || []),
            {
              name: form.name,
              number: form.number,
              expiry: form.expiry,
              cvc: form.cvc,
            },
          ],
        });
      }

      setSuccess("Payment method added successfully!");
      setForm({ name: "", number: "", expiry: "", cvc: "" });
      setErrors({});
      setValid({});
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding payment method:", error);
      setErrors({ general: "Failed to add payment method. Please try again." });
      setSuccess("");
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedForm = {
      ...form,
      [name]: type === "checkbox" ? checked : value,
    };
    setForm(updatedForm);
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
  };

  useEffect(() => {
    // Kolla att alla valideringsregler är true och inga errors finns
    const requiredFields = ["name", "number", "expiry", "cvc"];
    const allValid =
      requiredFields.every((field) => valid[field]) &&
      requiredFields.every((field) => !errors[field]);
    setFormComplete(allValid);
  }, [valid, errors]);

  return (
    <div className="form-container payment-method-form-container">
      <div className="form-header">
        <h2 className="form-title">Add Payment Method</h2>
        <button
          className="cancel-button-m"
          type="button"
          onClick={handleCancel}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <InputField
          label="Name on Card"
          name="name"
          type="text"
          value={form.name}
          onChange={handleInputChange}
          onClear={() => handleClear("name")}
          error={errors.name}
          valid={valid.name}
          hovered={hovered.name}
          setHovered={(v) => setHovered((prev) => ({ ...prev, name: v }))}
        />
        <InputField
          label="Card Number"
          name="number"
          type="text"
          value={form.number}
          onChange={handleInputChange}
          onClear={() => handleClear("number")}
          error={errors.number}
          valid={valid.number}
          hovered={hovered.number}
          setHovered={(v) => setHovered((prev) => ({ ...prev, number: v }))}
        />
        <div className="form-inputs-row-container">
          <InputField
            label="Expiry"
            name="expiry"
            type="text"
            value={form.expiry}
            onChange={handleInputChange}
            onClear={() => handleClear("expiry")}
            error={errors.expiry}
            valid={valid.expiry}
            hovered={hovered.expiry}
            setHovered={(v) => setHovered((prev) => ({ ...prev, expiry: v }))}
          />
          <InputField
            label="CVC"
            name="cvc"
            type="text"
            value={form.cvc}
            onChange={handleInputChange}
            onClear={() => handleClear("cvc")}
            error={errors.cvc}
            valid={valid.cvc}
            hovered={hovered.cvc}
            setHovered={(v) => setHovered((prev) => ({ ...prev, cvc: v }))}
          />
          <button
            className={`add-button-l ${!formComplete ? "disabled" : ""}`}
            type="submit"
            disabled={!formComplete}
          >
            <i className="fas fa-add"></i>
          </button>
        </div>
        {/* Skapa en checkbox för att spara kortet som primärt */}
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="isPrimary"
            name="isPrimary"
            className="form-checkbox"
            checked={form.isPrimary}
            onChange={handleInputChange}
            onClear={() => handleClear("isPrimary")}
          />
          <label htmlFor="isPrimary" className="form-checkbox-label">
            Set as Primary
          </label>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodForm;
