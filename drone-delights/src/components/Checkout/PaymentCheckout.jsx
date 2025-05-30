import "../../styles/FormStyles.css";
import "../../styles/ButtonStyles.css";
import "../../styles/PaymentStyles.css";
import mastercardLogo from "../../assets/images/mastercard.svg";
import swish from "../../assets/images/swish.svg";
import { PaymentContext } from "../../context/PaymentContext";
import { useState, useEffect, useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { validateInputs } from "../../utils/validateInputs";
import InputField from "../UI/Input/InputField";
import { useNavigate } from "react-router-dom";

function PaymentCheckout({ onSuccess, className = "" }) {
  const { paymentInfo, setPaymentInfo } = useContext(PaymentContext);
  const { user, token, updateUser } = useAuth();
  const [selected, setSelected] = useState("mastercard");
  const [saveCard, setSaveCard] = useState(false);
  const navigate = useNavigate();

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

  // Fyll i primary payment method om användaren är inloggad
  useEffect(() => {
    if (user && user.paymentMethods && user.paymentMethods.length > 0) {
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
    // Om gäst eller inget primary: töm fälten
    setForm({
      name: "",
      number: "",
      expiry: "",
      cvc: "",
      phone: "",
    });
  }, [user]);

  const handleClear = (field) => {
    const updatedForm = { ...form, [field]: "" };
    setForm(updatedForm);
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
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
    // Validera rätt fält beroende på metod
    let requiredFields = [];
    if (selected === "mastercard") {
      requiredFields = ["name", "number", "expiry", "cvc"];
    } else if (selected === "swish") {
      requiredFields = ["phone"];
    }
    const allValid =
      requiredFields.every((field) => valid[field]) &&
      requiredFields.every((field) => !errors[field]);
    setFormComplete(allValid);
  }, [valid, errors, selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validera igen innan submit
    const { errors: newErrors, valid: newValid } = validateInputs(form);
    setErrors(newErrors);
    setValid(newValid);

    if (selected === "mastercard") {
      if (
        !newValid.name ||
        !newValid.number ||
        !newValid.expiry ||
        !newValid.cvc
      ) {
        return;
      }

      console.log({ paymentInfo });

      setPaymentInfo({
        name: form.name,
        number: form.number,
        expiry: form.expiry,
        cvc: form.cvc,
        method: "Mastercard",
      });

      console.log({ paymentInfo });
      console.log({ form });

      // Spara nytt kort till backend om inloggad och nytt kort
      if (
        user &&
        saveCard &&
        (!user.paymentMethods ||
          !user.paymentMethods.some(
            (pm) => pm.number === form.number && pm.expiry === form.expiry
          ))
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
          if (data.user) {
            updateUser(data.user);
          }
        } catch (error) {
          console.error("Error saving payment method:", error);
          return;
        }
      }
    } else if (selected === "swish") {
      if (!newValid.phone) {
        return;
      }
      setPaymentInfo({
        phone: form.phone,
        method: "Swish",
      });
    }

    navigate("/order-confirmation");
    if (onSuccess) onSuccess();
  };

  return (
    <div
      className={`form-container payment-method-form-container ${className}`}
    >
      <div className="form-header">
        <h2 className="form-title">Payment</h2>
        <div className="payment-options-container">
          <button
            className={`swish-btn payment-btn ${
              selected === "swish" ? "selected-btn" : ""
            }`}
            onClick={() => setSelected("swish")}
            type="button"
          >
            <img src={swish} alt="Swish" className="swish-icon" />
          </button>
          <button
            className={`mastercard-btn payment-btn ${
              selected === "mastercard" ? "selected-btn" : ""
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
      </div>

      {selected === "mastercard" && (
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
              className={`full-button-green ${!formComplete ? "disabled" : ""}`}
              type="submit"
              disabled={!formComplete}
            >
              <span className="button-text">Place Order</span>
            </button>
          </div>
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
          <InputField
            label="Phone"
            name="phone"
            type="text"
            value={form.phone || ""}
            onChange={handleInputChange}
            onClear={() => handleClear("phone")}
            error={errors.phone}
            valid={valid.phone}
            hovered={hovered.phone}
            setHovered={(v) => setHovered((prev) => ({ ...prev, phone: v }))}
          />
          <button
            className={`add-button-l ${!formComplete ? "disabled" : ""}`}
            type="submit"
            disabled={!formComplete}
          >
            <span className="button-text">Place Order</span>
          </button>
        </form>
      )}
    </div>
  );
}

export default PaymentCheckout;
