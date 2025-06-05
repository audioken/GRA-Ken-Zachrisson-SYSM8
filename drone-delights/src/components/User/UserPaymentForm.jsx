import "../../styles/FormStyles.css";
import "../../styles/ButtonStyles.css";
import { useState, useEffect } from "react";
import { validateInputs } from "../../utils/validateInputs";
import { useAuth } from "../../context/AuthContext";
import useIsMobile from "../../hooks/useIsMobile";
import axios from "axios";
import InputField from "../UI/Input/InputField";
import Button from "../UI/Button/Button";

function UserPaymentForm({ onCancel, onSuccess }) {
  const { user, updateUser, token } = useAuth();
  const isMobile = useIsMobile(768);

  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    isPrimary: false,
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [formComplete, setFormComplete] = useState(false);
  const [succes, setSuccess] = useState("");

  const [hovered, setHovered] = useState({
    name: false,
    number: false,
    expiry: false,
    cvc: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let inputValue = type === "checkbox" ? checked : value;

    // Lägg automatiskt till "/" efter två siffror i expiry
    if (name === "expiry") {
      inputValue = inputValue.replace(/\D/g, ""); // Tar bort icke-siffror
      if (inputValue.length > 2) {
        inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}`;
      }
    }

    const updatedForm = {
      ...form,
      [name]: inputValue,
    };

    setForm(updatedForm);
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
  };

  // Rensa ett fält och kör ny validering
  const handleClear = (field) => {
    const updatedForm = { ...form, [field]: "" };
    setForm(updatedForm);
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
  };

  // Återställ formuläret vid avbryt
  const handleCancel = () => {
    setForm({ name: "", number: "", expiry: "", cvc: "", isPrimary: false });
    setErrors({});
    setValid({});
    setSuccess("");
    if (onCancel) onCancel();
  };

  // Skicka formuläret till backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, valid } = validateInputs(form);
    setErrors(errors);
    setValid(valid);

    // Stoppa om något fält är ogiltigt
    if (!valid.name || !valid.number || !valid.expiry || !valid.cvc) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/payment-methods`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Uppdatera användaren med rätt data beroende på vad backend skickar
      if (res.data.user) {
        updateUser(res.data.user);
      } else if (res.data.paymentMethods) {
        updateUser({ ...user, paymentMethods: res.data.paymentMethods });
      } else {
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
      handleCancel();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding payment method:", error);
      setErrors({ general: "Failed to add payment method. Please try again." });
      setSuccess("");
    }
  };

  // Kolla om formuläret är komplett
  useEffect(() => {
    const required = ["name", "number", "expiry", "cvc"];
    const isComplete =
      required.every((field) => valid[field]) &&
      required.every((field) => !errors[field]);
    setFormComplete(isComplete);
  }, [valid, errors]);

  return (
    <section className="form-container">
      <header className="form-header">
        <h2 className="form-title">Add Payment Method</h2>
        <Button
          text={<i className="fas fa-times"></i>}
          style="cancel-button-s"
          onClick={handleCancel}
        />
      </header>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-inputs-container">
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

            {!isMobile && (
              <Button
                className={`add-button-l ${!formComplete ? "disabled" : ""}`}
                type="submit"
                disabled={!formComplete}
                text={<i className="fas fa-add"></i>}
              />
            )}
          </div>
        </div>

        {isMobile && (
          <Button
            className={`full-green ${!formComplete ? "disabled" : ""}`}
            type="submit"
            disabled={!formComplete}
            text="Save New Card"
          />
        )}

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="isPrimary"
            name="isPrimary"
            className="form-checkbox"
            checked={form.isPrimary}
            onChange={handleInputChange}
          />
          <label htmlFor="isPrimary" className="form-checkbox-label">
            Set as Primary
          </label>
        </div>
      </form>
    </section>
  );
}

export default UserPaymentForm;
