import "../../styles/FormStyles.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateInputs } from "../../utils/validateInputs";
import InputField from "../UI/Input/InputField";
import PasswordField from "../UI/Input/PasswordField";
import Button from "../UI/Button/Button";
import TextToLink from "../Shared/TextToLink/TextToLink";
import axios from "axios";

function RegisterForm() {
  const navigate = useNavigate();

  // Formulärdata
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Visuella tillstånd
  const [showPassword, setShowPassword] = useState(false);
  const [usernameHovered, setUsernameHovered] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [passwordHovered, setPasswordHovered] = useState(false);

  // Validering och fältstatus
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);

  // Aktivera knapp endast när alla fält är giltiga
  const [formComplete, setFormComplete] = useState(false);
  useEffect(() => {
    const requiredFields = ["username", "email", "password"];
    const allValid =
      requiredFields.every((field) => valid[field]) &&
      requiredFields.every((field) => !errors[field]);
    setFormComplete(allValid);
  }, [valid, errors]);

  // Input-hanterare med live-validering och kontroll av tillgänglighet
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);

    // Kontrollera om användarnamnet är tillgängligt
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

    // Kontrollera om e-postadressen är tillgänglig
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

  // Rensa ett specifikt fält och validera om
  const clearField = (field) => {
    const updatedForm = { ...form, [field]: "" };
    setForm(updatedForm);

    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);

    if (field === "username") setUsernameAvailable(null);
    if (field === "email") setEmailAvailable(null);
  };

  // Skicka formuläret
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

  return (
    <div className="form-container register-form-container">
      <div className="form-header">
        <h2 className="form-title">Create an Account</h2>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-inputs-container">
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
        </div>
        <Button
          type="submit"
          style={`full-green ${!formComplete ? "disabled" : ""}`}
          text="Register"
          disabled={!formComplete}
        />
      </form>
      <TextToLink
        message="Have an account?"
        path="/login"
        style="lite"
        text="Log In"
      />
    </div>
  );
}

export default RegisterForm;
