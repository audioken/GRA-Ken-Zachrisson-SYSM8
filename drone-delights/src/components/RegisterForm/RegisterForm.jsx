import "./RegisterForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateInputs } from "../../utils/validateInputs";
import axios from "axios";

function RegisterForm() {
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordHovered, setPasswordHovered] = useState(false);
  const [usernameHovered, setUsernameHovered] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Live-validering och username-check i realtid
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Validera alla fält
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);

    // Kolla username direkt när man skriver
    if (name === "username") {
      if (value.length >= 3) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/check-username/${value}`
          );
          setUsernameAvailable(res.data.available);
        } catch {
          setUsernameAvailable(null);
        }
      } else {
        setUsernameAvailable(null);
      }
    }

    // Kolla email direkt när man skriver
    if (name === "email") {
      if (
        value.length > 5 &&
        /^[^@]+@[^@]+\.[^@]+$/.test(value) // enkel email-regex
      ) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/check-email/${value}`
          );
          setEmailAvailable(res.data.available);
        } catch {
          setEmailAvailable(null);
        }
      } else {
        setEmailAvailable(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { errors } = validateInputs(form);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, form);
      navigate("/login");
    } catch (error) {
      console.error("Registrering misslyckades:", error);
    }
  };

  const clearField = (field) => {
    const updatedForm = { ...form, [field]: "" };
    setForm(updatedForm);

    // Validera direkt efter rensning
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);

    // Nollställ tillgänglighet för username/email
    if (field === "username") setUsernameAvailable(null);
    if (field === "email") setEmailAvailable(null);
  };

  return (
    <div className="register-form-container">
      <div className="register-form-header">
        <h2 className="register-title">Create an Account</h2>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        {/* Username */}
        <div
          className="form-group"
          onMouseEnter={() => setUsernameHovered(true)}
          onMouseLeave={() => setUsernameHovered(false)}
        >
          <div className="label-container">
            <label htmlFor="username">Username</label>
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
            {usernameAvailable === false && (
              <span className="error">Username taken</span>
            )}
          </div>
          <input
            type="text"
            id="username"
            name="username"
            required
            className={
              errors.username || usernameAvailable === false
                ? "input-error"
                : valid.username && usernameAvailable
                ? "input-success"
                : ""
            }
            value={form.username}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {/* Clear/X-knapp */}
          {form.username && (!valid.username || usernameHovered) && (
            <span
              className="clear-input"
              onClick={() => clearField("username")}
              tabIndex={0}
              aria-label="Clear username"
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          )}
          {/* Checkmark */}
          {!usernameHovered && valid.username && usernameAvailable && (
            <span className="input-checkmark">
              <i class="fa-solid fa-check"></i>
            </span>
          )}
        </div>

        {/* Email */}
        <div
          className="form-group"
          onMouseEnter={() => setEmailHovered(true)}
          onMouseLeave={() => setEmailHovered(false)}
        >
          <div className="label-container">
            <label htmlFor="email">Email</label>
            {errors.email && <span className="error">{errors.email}</span>}
            {emailAvailable === false && (
              <span className="error">Email already registered</span>
            )}
          </div>
          <input
            type="email"
            id="email"
            name="email"
            required
            className={
              errors.email || emailAvailable === false
                ? "input-error"
                : valid.email && emailAvailable
                ? "input-success"
                : ""
            }
            value={form.email}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {/* Clear/X-knapp */}
          {form.email && (!valid.email || emailHovered) && (
            <span
              className="clear-input"
              onClick={() => clearField("email")}
              tabIndex={0}
              aria-label="Clear email"
            >
              <i className="fa-solid fa-xmark"></i>
            </span>
          )}
          {/* Checkmark */}
          {!emailHovered && valid.email && emailAvailable && (
            <span className="input-checkmark">
              <i class="fa-solid fa-check"></i>
            </span>
          )}
        </div>

        {/* Password */}
        <div
          className="form-group"
          onMouseEnter={() => setPasswordHovered(true)}
          onMouseLeave={() => setPasswordHovered(false)}
        >
          <div className="label-container">
            <label htmlFor="password">Password</label>
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            required
            className={
              errors.password
                ? "input-error"
                : valid.password
                ? "input-success"
                : ""
            }
            value={form.password}
            onChange={handleInputChange}
            autoComplete="off"
          />
          {passwordHovered && (
            <span
              className="password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <div className="eye-icon">
                  <i className="fa-solid fa-eye"></i>
                </div>
              ) : (
                <div className="eye-icon">
                  <i className="fa-solid fa-eye-slash"></i>
                </div>
              )}
            </span>
          )}
          {!passwordHovered &&
            valid.password &&
            !errors.password &&
            form.password && (
              <span className="input-checkmark">
                <i class="fa-solid fa-check"></i>
              </span>
            )}
        </div>
        <button className="register-account-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
