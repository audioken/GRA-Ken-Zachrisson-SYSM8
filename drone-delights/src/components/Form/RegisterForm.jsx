import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateInputs } from "../../utils/validateInputs";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
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
    <div className="form-container register-form-container">
      <div className="form-header">
        <h2 className="form-title">Create an Account</h2>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleInputChange}
          onClear={() => clearField("username")}
          error={errors.username}
          valid={valid.username}
          available={usernameAvailable}
          hovered={usernameHovered}
          setHovered={setUsernameHovered}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleInputChange}
          onClear={() => clearField("email")}
          error={errors.email}
          valid={valid.email}
          available={emailAvailable}
          hovered={emailHovered}
          setHovered={setEmailHovered}
        />

        <PasswordField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleInputChange}
          error={errors.password}
          valid={valid.password}
          hovered={passwordHovered}
          setHovered={setPasswordHovered}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        <button className="form-submit-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
