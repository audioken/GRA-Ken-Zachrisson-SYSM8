import "../../styles/TypographyStyles.css";
import "../../styles/FormStyles.css";
import "../../styles/DeliveryStyles.css";

import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { DeliveryContext } from "../../context/DeliveryContext";
import { validateInputs } from "../../utils/validateInputs";
import useIsMobile from "../../hooks/useIsMobile";

import axios from "axios";
import InputField from "../UI/Input/InputField";
import Button from "../UI/Button/Button";

function UserDeliveryForm({ isExpanded, onExpand }) {
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
  const { user, token, login } = useAuth();
  const isMobile = useIsMobile(768);

  const isLoggedIn = !!user;

  // Formtillstånd
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  });

  const [originalForm, setOriginalForm] = useState(form);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [editMode, setEditMode] = useState(false);

  const [hovered, setHovered] = useState({
    name: false,
    phone: false,
    address: false,
    postalCode: false,
    city: false,
  });

  // Fyll i formulärdata beroende på om användaren är inloggad
  useEffect(() => {
    if (!isExpanded) {
      setEditMode(false);
      setErrors({});
      setValid({});

      const data = isLoggedIn ? user : deliveryInfo;

      setForm({
        name: data.name || "",
        phone: data.phone || "",
        address: data.address || "",
        postalCode: data.postalCode || "",
        city: data.city || "",
      });
    }
  }, [isExpanded, isLoggedIn, user, deliveryInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
  };

  const handleEdit = () => {
    setEditMode(true);
    setOriginalForm(form);
    const { errors, valid } = validateInputs(form);
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

  const isFormChanged = () =>
    Object.keys(form).some((key) => form[key] !== originalForm[key]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, valid } = validateInputs(form);
    setErrors(errors);
    setValid(valid);

    const allValid = Object.values(valid).every(Boolean);
    if (!allValid) return;

    if (isLoggedIn) {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/me`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      login(token, res.data.user);
    } else {
      setDeliveryInfo(form);
    }

    setEditMode(false);
  };

  const handleCancel = () => {
    const data = isLoggedIn ? user : deliveryInfo;

    setForm({
      name: data.name || "",
      phone: data.phone || "",
      address: data.address || "",
      postalCode: data.postalCode || "",
      city: data.city || "",
    });

    setErrors({});
    setValid({});
    setEditMode(false);
  };

  return (
    <section className="form-container">
      {/* Överlagring för att expandera/komprimera */}
      <div
        className="form-header-overlay"
        onClick={onExpand}
        aria-label={isExpanded ? "Collapse" : "Expand"}
      />

      <header className="form-header">
        <h2 className="form-title">Delivery Information</h2>

        {!editMode ? (
          <div
            className="icon-container-for-form icon-pen hl"
            onClick={(e) => {
              e.stopPropagation(); // Gör så att klicket inte stänger ner formuläret
              if (!isExpanded) {
                onExpand();
                setTimeout(() => handleEdit(), 0);
              } else {
                handleEdit();
              }
            }}
            tabIndex={0}
            aria-label="Edit delivery info"
          >
            <i className="fa-solid fa-pen"></i>
          </div>
        ) : (
          <Button
            text={<i className="fas fa-times"></i>}
            style="cancel-button-s"
            onClick={handleCancel}
          />
        )}
      </header>

      {isExpanded && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-inputs-container">
            <div className="form-inputs-row-container">
              <InputField
                label="Name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                onClear={() => handleClear("name")}
                error={errors.name}
                valid={valid.name && editMode}
                readOnly={!editMode}
                disabled={!editMode}
                hovered={hovered.name}
                setHovered={(v) => setHovered((prev) => ({ ...prev, name: v }))}
              />
              <InputField
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                onClear={() => handleClear("phone")}
                error={errors.phone}
                valid={valid.phone && editMode}
                readOnly={!editMode}
                disabled={!editMode}
                hovered={hovered.phone}
                setHovered={(v) =>
                  setHovered((prev) => ({ ...prev, phone: v }))
                }
              />
            </div>

            <InputField
              label="Address"
              name="address"
              value={form.address}
              onChange={handleInputChange}
              onClear={() => handleClear("address")}
              error={errors.address}
              valid={valid.address && editMode}
              readOnly={!editMode}
              disabled={!editMode}
              hovered={hovered.address}
              setHovered={(v) =>
                setHovered((prev) => ({ ...prev, address: v }))
              }
            />

            <div className="form-inputs-row-container">
              <InputField
                label="Zip Code"
                name="postalCode"
                value={form.postalCode}
                onChange={handleInputChange}
                onClear={() => handleClear("postalCode")}
                error={errors.postalCode}
                valid={valid.postalCode && editMode}
                readOnly={!editMode}
                disabled={!editMode}
                hovered={hovered.postalCode}
                setHovered={(v) =>
                  setHovered((prev) => ({ ...prev, postalCode: v }))
                }
              />
              <InputField
                label="City"
                name="city"
                value={form.city}
                onChange={handleInputChange}
                onClear={() => handleClear("city")}
                error={errors.city}
                valid={valid.city && editMode}
                readOnly={!editMode}
                disabled={!editMode}
                hovered={hovered.city}
                setHovered={(v) => setHovered((prev) => ({ ...prev, city: v }))}
              />

              {/* Desktop-knapp */}
              {!isMobile && (
                <Button
                  className={`${
                    !editMode ||
                    !isFormChanged() ||
                    !Object.values(valid).every(Boolean)
                      ? " disabled"
                      : ""
                  }`}
                  type="submit"
                  text={<i className="fas fa-check"></i>}
                  style="add-button-l"
                  disabled={
                    !editMode ||
                    !isFormChanged() ||
                    !Object.values(valid).every(Boolean)
                  }
                />
              )}
            </div>
          </div>

          {/* Mobilknapp */}
          {isMobile && (
            <Button
              className={`${
                !editMode ||
                !isFormChanged() ||
                !Object.values(valid).every(Boolean)
                  ? " disabled"
                  : ""
              }`}
              type="submit"
              text="Save Changes"
              style="full-green"
              disabled={
                !editMode ||
                !isFormChanged() ||
                !Object.values(valid).every(Boolean)
              }
            />
          )}
        </form>
      )}
    </section>
  );
}

export default UserDeliveryForm;
