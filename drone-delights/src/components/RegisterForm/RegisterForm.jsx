import "./RegisterForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { ...form };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        newUser
      );

      console.log("Registrering lyckades!", newUser);

      navigate("/login");
    } catch (error) {
      console.error("Registrering misslyckades:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="register-form-container">
      <div className="register-form-header">
        <h2 className="register-title">Create an Account</h2>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="register-account-btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
