import "../../styles/FormStyles.css";
import "../../styles/ButtonStyles.css";
import "../../styles/PaymentStyles.css";
import mastercardLogo from "../../assets/images/mastercard.svg";
import swish from "../../assets/images/swish.svg";
import { PaymentContext } from "../../context/PaymentContext";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { validateInputs } from "../../utils/validateInputs";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import Button from "../UI/Button/Button";
import InputField from "../UI/Input/InputField";

function CheckoutPaymentForm({ onSuccess, className = "" }) {
  const { paymentInfo, setPaymentInfo } = useContext(PaymentContext);
  const { user, token, updateUser } = useAuth();
  const isMobile = useIsMobile(768);
  const navigate = useNavigate();

  const [selected, setSelected] = useState("mastercard");
  const [saveCard, setSaveCard] = useState(false);

  const [form, setForm] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    phone: "",
  });

  const [hovered, setHovered] = useState({
    name: false,
    number: false,
    expiry: false,
    cvc: false,
    phone: false,
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [formComplete, setFormComplete] = useState(false);

  // Fyll formuläret med användarens primära betalkort om inloggad
  useEffect(() => {
    if (user?.paymentMethods?.length > 0) {
      const primary = user.paymentMethods.find((pm) => pm.isPrimary);
      if (primary) {
        const newForm = {
          name: primary.name || "",
          number: primary.number || "",
          expiry: primary.expiry || "",
          cvc: primary.cvc || "",
          phone: user.phone || "",
        };
        setForm(newForm);
        const { errors, valid } = validateInputs(newForm);
        setErrors(errors);
        setValid(valid);
        return;
      }
    }

    // Gäst eller ingen primär metod
    setForm({
      name: "",
      number: "",
      expiry: "",
      cvc: "",
      phone: "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === "checkbox" ? checked : value;

    // Lägg till "/" automatiskt i expiry
    if (name === "expiry") {
      // Ta bort allt utom siffror
      const digits = newValue.replace(/\D/g, "");
      if (digits.length <= 2) {
        newValue = digits;
      } else {
        newValue = digits.slice(0, 2) + "/" + digits.slice(2, 4);
      }
    }

    const updatedForm = {
      ...form,
      [name]: newValue,
    };
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

  // Uppdatera formComplete när validering förändras
  useEffect(() => {
    const relevantFields =
      selected === "mastercard"
        ? ["name", "number", "expiry", "cvc"]
        : ["phone"];

    const allValid = relevantFields.every(
      (field) => valid[field] && !errors[field]
    );

    setFormComplete(allValid);
  }, [valid, errors, selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Slutlig validering
    const { errors: newErrors, valid: newValid } = validateInputs(form);
    setErrors(newErrors);
    setValid(newValid);

    if (selected === "mastercard") {
      if (
        !newValid.name ||
        !newValid.number ||
        !newValid.expiry ||
        !newValid.cvc
      )
        return;

      setPaymentInfo({
        name: form.name,
        number: form.number,
        expiry: form.expiry,
        cvc: form.cvc,
        method: "Mastercard",
      });

      // Spara nytt kort om inloggad och kortet inte redan finns
      if (
        user &&
        saveCard &&
        !user.paymentMethods?.some(
          (pm) => pm.number === form.number && pm.expiry === form.expiry
        )
      ) {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/users/payment-methods`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                name: form.name,
                number: form.number,
                expiry: form.expiry,
                cvc: form.cvc,
                isPrimary: true,
              }),
            }
          );
          const data = await res.json();
          if (data.user) updateUser(data.user);
        } catch (error) {
          console.error("Error saving payment method:", error);
          return;
        }
      }
    } else if (selected === "swish") {
      if (!newValid.phone) return;

      setPaymentInfo({
        phone: form.phone,
        method: "Swish",
      });
    }

    navigate("/order-confirmation");
    if (onSuccess) onSuccess();
  };

  return (
    <section className={`form-container ${className}`}>
      <header className="form-header">
        <h2 className="form-title">Payment</h2>
        <div className="payment-options-container">
          <button
            className={`payment-btn ${
              selected === "swish" ? "selected-btn" : "hl"
            }`}
            onClick={() => setSelected("swish")}
            type="button"
          >
            <img src={swish} alt="Swish" className="swish-logo" />
          </button>
          <button
            className={`payment-btn ${
              selected === "mastercard" ? "selected-btn" : "hl"
            }`}
            onClick={() => setSelected("mastercard")}
            type="button"
          >
            <img
              src={mastercardLogo}
              alt="Mastercard"
              className="mastercard-logo"
            />
          </button>
        </div>
      </header>

      {selected === "mastercard" && (
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
                setHovered={(v) =>
                  setHovered((prev) => ({ ...prev, expiry: v }))
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
              {!isMobile && (
                <Button
                  className={`${!formComplete ? "disabled" : ""}`}
                  type="submit"
                  text="Pay"
                  style="full-green-pay"
                  disabled={!formComplete}
                />
              )}
            </div>
          </div>

          {isMobile && (
            <Button
              className={`${!formComplete ? "disabled" : ""}`}
              type="submit"
              text="Pay"
              style="full-green"
              disabled={!formComplete}
            />
          )}

          {user && selected === "mastercard" && (
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="saveCard"
                name="saveCard"
                checked={saveCard}
                onChange={() => setSaveCard((prev) => !prev)}
              />
              <label htmlFor="saveCard" className="form-checkbox-label">
                Save card as primary
              </label>
            </div>
          )}
        </form>
      )}

      {selected === "swish" && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-inputs-container">
            <div className="form-inputs-row-container-nowrap">
              <InputField
                label="Phone"
                name="phone"
                type="text"
                value={form.phone}
                onChange={handleInputChange}
                onClear={() => handleClear("phone")}
                error={errors.phone}
                valid={valid.phone}
                hovered={hovered.phone}
                setHovered={(v) =>
                  setHovered((prev) => ({ ...prev, phone: v }))
                }
              />
              <Button
                className={`${!formComplete ? "disabled" : ""}`}
                type="submit"
                text="Pay"
                style="full-green-pay"
                disabled={!formComplete}
              />
            </div>
          </div>
        </form>
      )}
    </section>
  );
}

export default CheckoutPaymentForm;
