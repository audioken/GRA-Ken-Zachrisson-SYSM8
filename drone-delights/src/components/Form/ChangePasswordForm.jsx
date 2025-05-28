import { useState, useEffect } from "react";
import { validateInputs } from "../../utils/validateInputs";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import PasswordField from "../Form/PasswordField";

function ChangePasswordForm() {
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
  };

  return (
    <div className="form-container change-password-form-container">
      <div className="form-header">
        <h2 className="form-title">Change Password</h2>
      </div>
      <form className="form">
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
      </form>
      <button className="form-submit-btn" type="submit">
        Update Password
      </button>
    </div>
  );
}

export default ChangePasswordForm;
