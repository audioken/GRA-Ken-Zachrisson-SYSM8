import { useState, useEffect } from "react";
import { validateInputs } from "../../utils/validateInputs";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import PasswordField from "../Form/PasswordField";

function ChangePasswordForm({ onCancel, onSuccess }) {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [hovered, setHovered] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [success, setSuccess] = useState("");
  const { user } = useAuth();

  const [form, setForm] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Live-validering och username-check i realtid
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Validera alla fält
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);
    setSuccess("");
  };

  // Submit-funktion
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors, valid } = validateInputs(form);
    setErrors(errors);
    setValid(valid);

    // Kolla att allt är godkänt
    if (!valid.current || !valid.new || !valid.confirm) return;

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/me/password`,
        {
          currentPassword: form.current,
          newPassword: form.new,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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

  // Cancel-funktion
  const handleCancel = () => {
    setForm({ current: "", new: "", confirm: "" });
    setErrors({});
    setValid({});
    setSuccess("");
    if (onCancel) onCancel();
  };

  return (
    <div className="form-container change-password-form-container">
      <div
        className="form-header"
        // onClick={onExpand}
        style={{ cursor: "pointer" }}
      >
        <h2 className="form-title">Change Password</h2>
      </div>
      {/* {isExpanded ? (
        <div> */}
          <form className="form" onSubmit={handleSubmit}>
            <PasswordField
              label="Current"
              name="current"
              value={form.current}
              onChange={handleInputChange}
              error={errors.current}
              valid={valid.current}
              hovered={hovered.current}
              setHovered={(v) =>
                setHovered((prev) => ({ ...prev, current: v }))
              }
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
              setHovered={(v) =>
                setHovered((prev) => ({ ...prev, confirm: v }))
              }
              showPassword={showPassword.confirm}
              setShowPassword={(v) =>
                setShowPassword((prev) => ({ ...prev, confirm: v }))
              }
            />
            <div className="form-btns-container">
              <button className="form-submit-btn" type="submit">
                Update Password
              </button>
              <button
                className="form-cancel-btn"
                type="button"
                onClick={handleCancel}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            {success && <div className="success">{success}</div>}
          </form>
        </div>
    //   ) : null}
    // </div>
  );
}

export default ChangePasswordForm;
