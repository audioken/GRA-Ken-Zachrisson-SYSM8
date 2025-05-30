import "../../styles/FormStyles.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { DeliveryContext } from "../../context/DeliveryContext";
import { PaymentContext } from "../../context/PaymentContext";
import { useContext } from "react";
import InputField from "../UI/Input/InputField";
import PasswordField from "../UI/Input/PasswordField";
import axios from "axios";

function LoginForm() {
  const { login } = useAuth();
  const { setDeliveryInfo } = useContext(DeliveryContext);
  const { setPaymentInfo } = useContext(PaymentContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [showPassword, setShowPassword] = useState({ password: false });
  const [hovered, setHovered] = useState({ password: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        form
      );
      login(response.data.accessToken, response.data.user);
      setDeliveryInfo({
        name: response.data.user.name,
        phone: response.data.user.phone,
        address: response.data.user.address,
        postalCode: response.data.user.postalCode,
        city: response.data.user.city,
      });
      setPaymentInfo({
        name: response.data.user.name,
        phone: response.data.user.phone,
        card: "",
        expiry: "",
        cvc: "",
      });
      navigate("/menu");
    } catch (error) {
      console.error("Inloggning misslyckades:", error);
    }
  };

  return (
    <div className="form-container login-form-container">
      <div className="form-header">
        <h2 className="form-title">Log In</h2>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <InputField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleInputChange}
          error={errors.username}
          valid={valid.username}
        />
        <PasswordField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleInputChange}
          error={errors.password}
          valid={valid.password}
          hovered={hovered.password}
          setHovered={(v) => setHovered((prev) => ({ ...prev, password: v }))}
          showPassword={showPassword.password}
          setShowPassword={(v) =>
            setShowPassword((prev) => ({ ...prev, password: v }))
          }
        />
        <button className="form-submit-btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
