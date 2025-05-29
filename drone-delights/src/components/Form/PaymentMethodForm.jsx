import "./FormStyles.css";
import "../Buttons.css"
import "./PaymentMethodForm.css"
import { useState, useEffect } from "react";
import { validateInputs } from "../../utils/validateInputs";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import InputField from "./InputField";

function PaymentMethodForm({ onCancel, onSuccess }) {
  const [form, setForm] = useState({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    isPrimary: false,
  });

  const [hovered, setHovered] = useState({
    nameOnCard: false,
    cardNumber: false,
    expiryDate: false,
    cvc: false,
  });

  const { user, updateUser, token } = useAuth();
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [success, setSuccess] = useState("");
  const [formComplete, setFormComplete] = useState(false);

  const handleCancel = () => {
    setForm({ nameOnCard: "", cardNumber: "", expiryDate: "", cvc: "" });
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
      !valid.nameOnCard ||
      !valid.cardNumber ||
      !valid.expiryDate ||
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
              name: form.nameOnCard,
              number: form.cardNumber,
              expiry: form.expiryDate,
              cvc: form.cvc,
            },
          ],
        });
      }

      setSuccess("Payment method added successfully!");
      setForm({ nameOnCard: "", cardNumber: "", expiryDate: "", cvc: "" });
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
    const requiredFields = ["nameOnCard", "cardNumber", "expiryDate", "cvc"];
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
          name="nameOnCard"
          type="text"
          value={form.nameOnCard}
          onChange={handleInputChange}
          onClear={() => handleClear("nameOnCard")}
          error={errors.nameOnCard}
          valid={valid.nameOnCard}
          hovered={hovered.nameOnCard}
          setHovered={(v) => setHovered((prev) => ({ ...prev, nameOnCard: v }))}
        />
        <InputField
          label="Card Number"
          name="cardNumber"
          type="text"
          value={form.cardNumber}
          onChange={handleInputChange}
          onClear={() => handleClear("cardNumber")}
          error={errors.cardNumber}
          valid={valid.cardNumber}
          hovered={hovered.cardNumber}
          setHovered={(v) => setHovered((prev) => ({ ...prev, cardNumber: v }))}
        />
        <div className="form-inputs-row-container">
          <InputField
            label="Expiry"
            name="expiryDate"
            type="text"
            value={form.expiryDate}
            onChange={handleInputChange}
            onClear={() => handleClear("expiryDate")}
            error={errors.expiryDate}
            valid={valid.expiryDate}
            hovered={hovered.expiryDate}
            setHovered={(v) =>
              setHovered((prev) => ({ ...prev, expiryDate: v }))
            }
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
