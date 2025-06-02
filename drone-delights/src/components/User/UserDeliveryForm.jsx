import "../../styles/TypographyStyles.css";
import "../../styles/FormStyles.css";
import "../../styles/DeliveryStyles.css";
import { useContext, useState, useEffect, use } from "react";
import { useAuth } from "../../context/AuthContext";
import { DeliveryContext } from "../../context/DeliveryContext";
import { validateInputs } from "../../utils/validateInputs";
import useIsMobile from "../../hooks/useIsMobile";
import axios from "axios";
import InputField from "../UI/Input/InputField";
import Button from "../UI/Button/Button";

function UserDeliveryForm({ isExpanded, onExpand }) {
  const { deliveryInfo, setDeliveryInfo } = useContext(DeliveryContext);
  const [editMode, setEditMode] = useState(false);
  const { user, token, login } = useAuth();
  const isMobile = useIsMobile(768);

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

  const [hovered, setHovered] = useState({
    name: false,
    phone: false,
    address: false,
    postalCode: false,
    city: false,
  });

  const isLoggedIn = !!user;

  useEffect(() => {
    if (!isExpanded) {
      setEditMode(false);
      setErrors({});
      setValid({});
      if (isLoggedIn) {
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
    setOriginalForm(form); // Spara originalvärden för att kunna återställa
    const { errors, valid } = validateInputs(form);
    setErrors(errors);
    setValid(valid);
  };

  const isFormChanged = () => {
    return Object.keys(form).some((key) => form[key] !== originalForm[key]);
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

    if (Object.values(valid).every(Boolean)) {
      if (isLoggedIn) {
        // Spara till backend
        const res = await axios.patch(
          `${process.env.REACT_APP_API_URL}/users/me`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        // Uppdatera user i AuthContext direkt!
        login(token, res.data.user);
      } else {
        setDeliveryInfo(form);
      }
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    if (isLoggedIn) {
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
    setErrors({});
    setValid({});
    setEditMode(false);
  };

  return (
    <div className="form-container">
      <div
        className="form-header-overlay"
        onClick={onExpand}
        aria-label={isExpanded ? "Collapse" : "Expand"}
      />
      <div className="form-header">
        <h2 className="form-title">Delivery Information</h2>
        {!editMode && (
          <div
            className="icon-container-for-form icon-pen"
            onClick={(e) => {
              e.stopPropagation();
              if (!isExpanded) {
                onExpand(); // Expanda panelen först!
                // Vänta tills panelen är öppen innan du sätter editMode
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
        )}
        {editMode && (
          <button
            className="cancel-button-m"
            type="button"
            onClick={handleCancel}
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
      {isExpanded ? (
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
              {!isMobile && (
                <Button
                  className={`form-submit-btn-mini${
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
            {isMobile && (
              <Button
                className={`full-green${
                  !editMode ||
                  !isFormChanged() ||
                  !Object.values(valid).every(Boolean)
                    ? " disabled"
                    : ""
                }`}
                type="submit"
                text="Save Changes"
                disabled={
                  !editMode ||
                  !isFormChanged() ||
                  !Object.values(valid).every(Boolean)
                }
              />
            )}
        </form>
      ) : null}
    </div>
  );
}

export default UserDeliveryForm;
