import "./LoginForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Importerar AuthContext för autentisering
import axios from "axios";

function LoginForm() {
  const { login } = useAuth(); // Hämtar login-funktionen från AuthContext
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await fetch("http://localhost:3001/users");
  //     const data = await response.json();

  //     const user = data.find(
  //       (user) =>
  //         user.username === form.username && user.password === form.password
  //     );

  //     if (user) {
  //       console.log("Login successful", user);
  //       navigate("/menu");
  //     } else {
  //       console.error("Invalid email or password");
  //     }
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  // };

  // Hantera formulärinlämning
  const handleSubmit = async (e) => {
    e.preventDefault(); // Förhindra standardbeteende för formulärinlämning

    try {
      // Skicka POST-förfrågan till servern med formulärdata
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        form
      );

      // Spara det token vi får tillbaka i AuthContext
      login(response.data.accessToken);
      console.log("Inloggning lyckades!", response.data);
      console.log("Token:", response.data.accessToken);

      navigate("/menu");
    } catch (error) {
      console.error("Inloggning misslyckades:", error);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-header">
        <h2 className="login-title">Enter Your Details</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
