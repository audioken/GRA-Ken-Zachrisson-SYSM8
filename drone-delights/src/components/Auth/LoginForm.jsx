import "../../styles/FormStyles.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DeliveryContext } from "../../context/DeliveryContext";
import { PaymentContext } from "../../context/PaymentContext";
import InputField from "../UI/Input/InputField";
import PasswordField from "../UI/Input/PasswordField";
import Button from "../UI/Button/Button";
import TextToLink from "../Shared/TextToLink/TextToLink";
import axios from "axios";

function LoginForm() {
  // Contexts
  const { login } = useAuth();
  const { setDeliveryInfo } = useContext(DeliveryContext);
  const { setPaymentInfo } = useContext(PaymentContext);

  // Navigering efter inloggning
  const navigate = useNavigate();

  // Formulärdata
  const [form, setForm] = useState({ username: "", password: "" });

  // Visar eller döljer lösenord
  const [showPassword, setShowPassword] = useState({ password: false });

  // Hover-status för lösenordsikonen
  const [hovered, setHovered] = useState({ password: false });

  // Felmeddelande vid inloggning
  const [error, setError] = useState("");

  // Hanterar input-ändringar
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Skickar inloggningsförfrågan
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        form
      );

      // Spara token och användare
      login(response.data.accessToken, response.data.user);

      // Förifyll leveransuppgifter
      setDeliveryInfo({
        name: response.data.user.name,
        phone: response.data.user.phone,
        address: response.data.user.address,
        postalCode: response.data.user.postalCode,
        city: response.data.user.city,
      });

      // Förifyll betalningsuppgifter (kortfält tomma)
      setPaymentInfo({
        name: response.data.user.name,
        phone: response.data.user.phone,
        card: "",
        expiry: "",
        cvc: "",
      });

      // Gå vidare till meny
      navigate("/menu");
    } catch (error) {
      setError("Username or Password was wrong");
      console.error("Inloggning misslyckades:", error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h2 className="form-title">Log In</h2>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-inputs-container">
          <InputField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleInputChange}
          />
          <PasswordField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            hovered={hovered.password}
            setHovered={(v) => setHovered((prev) => ({ ...prev, password: v }))}
            showPassword={showPassword.password}
            setShowPassword={(v) =>
              setShowPassword((prev) => ({ ...prev, password: v }))
            }
          />
        </div>
        {error && <div className="form-error">{error}</div>}
        <Button type="submit" text="Log In" style="full-green" />
      </form>
      <TextToLink
        message="No account?"
        path="/register"
        style="lite"
        text="Register"
      />
    </div>
  );
}

export default LoginForm;
