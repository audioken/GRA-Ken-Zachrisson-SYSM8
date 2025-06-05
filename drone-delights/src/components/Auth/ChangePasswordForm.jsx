import "../../styles/FormStyles.css";
import { useState, useEffect } from "react";
import { validateInputs } from "../../utils/validateInputs";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import PasswordField from "../UI/Input/PasswordField";
import Button from "../UI/Button/Button";

function ChangePasswordForm({ onCancel, onSuccess }) {
  // Context
  const { token } = useAuth();

  // Formulärdata
  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Visar eller döljer lösenord
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Hover-status för ikoner
  const [hovered, setHovered] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Felmeddelanden och valideringsstatus
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});

  // Statusmeddelande vid lyckad uppdatering
  const [success, setSuccess] = useState("");

  // Om alla fält är korrekt ifyllda
  const [formComplete, setFormComplete] = useState(false);

  // Kolla om formuläret är komplett (triggeras vid ändring av errors eller valid)
  useEffect(() => {
    const requiredFields = ["current", "new", "confirm"];
    const allValid =
      requiredFields.every((field) => valid[field]) &&
      requiredFields.every((field) => !errors[field]);
    setFormComplete(allValid);
  }, [valid, errors]);

  // Hanterar input och live-validerar
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
    setSuccess("");
  };

  // Skickar formuläret
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, valid } = validateInputs(form);
    setErrors(errors);
    setValid(valid);

    if (!valid.current || !valid.new || !valid.confirm) return;

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/me/password`,
        {
          currentPassword: form.current,
          newPassword: form.new,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuccess("Password updated!");
      setForm({ current: "", new: "", confirm: "" });
      setErrors({});
      setValid({});
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        current:
          err.response?.data?.message ||
          "Could not update password. Is your current password correct?",
      }));
      setSuccess("");
    }
  };

  // Återställer formuläret
  const handleCancel = () => {
    setForm({ current: "", new: "", confirm: "" });
    setErrors({});
    setValid({});
    setSuccess("");
    if (onCancel) onCancel();
  };

  return (
    <div className="form-container">
      <header className="form-header" style={{ cursor: "pointer" }}>
        <h2 className="form-title">Change Password</h2>
        <Button
          text={<i className="fas fa-times"></i>}
          style="cancel-button-s"
          onClick={handleCancel}
        />
      </header>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-inputs-container">
          <PasswordField
            label="Current"
            name="current"
            value={form.current}
            onChange={handleInputChange}
            error={errors.current}
            valid={valid.current}
            hovered={hovered.current}
            setHovered={(v) => setHovered((prev) => ({ ...prev, current: v }))}
            showPassword={showPassword.current}
            setShowPassword={(v) =>
              setShowPassword((prev) => ({ ...prev, current: v }))
            }
          />
          <PasswordField
            label="New"
            name="new"
            value={form.new}
            onChange={handleInputChange}
            error={errors.new}
            valid={valid.new}
            hovered={hovered.new}
            setHovered={(v) => setHovered((prev) => ({ ...prev, new: v }))}
            showPassword={showPassword.new}
            setShowPassword={(v) =>
              setShowPassword((prev) => ({ ...prev, new: v }))
            }
          />
          <PasswordField
            label="Confirm"
            name="confirm"
            value={form.confirm}
            onChange={handleInputChange}
            error={errors.confirm}
            valid={valid.confirm}
            hovered={hovered.confirm}
            setHovered={(v) => setHovered((prev) => ({ ...prev, confirm: v }))}
            showPassword={showPassword.confirm}
            setShowPassword={(v) =>
              setShowPassword((prev) => ({ ...prev, confirm: v }))
            }
          />
        </div>
        <Button
          text="Update Password"
          style={`full-green ${!formComplete ? "disabled" : ""}`}
          type="submit"
          disabled={!formComplete}
        />

        {success && (
          <div className="success" role="status" aria-live="polite">
            {success}
          </div>
        )}
      </form>
    </div>
  );
}

export default ChangePasswordForm;
