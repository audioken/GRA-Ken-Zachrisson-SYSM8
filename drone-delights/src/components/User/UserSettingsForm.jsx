import "../../styles/FormStyles.css";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { validateInputs } from "../../utils/validateInputs";
import InputFieldEdit from "../UI/Input/InputFieldEdit";
import Button from "../UI/Button/Button";

function UserSettingsForm({ isExpanded, onExpand, onChangePasswordClick }) {
  const { user, login } = useAuth();

  // Form och tillstånd
  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [usernameHovered, setUsernameHovered] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);

  // Input-hanterare: validering + tillgänglighetskoll
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);

    // Tillgänglighetskontroll för username
    if (name === "username") {
      if (value.length >= 3) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/check-username/${value}`
          );
          setUsernameAvailable(res.data.available || value === user.username);
        } catch {
          setUsernameAvailable(null);
        }
      } else {
        setUsernameAvailable(null);
      }
    }

    // Tillgänglighetskontroll för email
    if (name === "email") {
      if (value.length > 5 && /^[^@]+@[^@]+\.[^@]+$/.test(value)) {
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/check-email/${value}`
          );
          setEmailAvailable(res.data.available || value === user.email);
        } catch {
          setEmailAvailable(null);
        }
      } else {
        setEmailAvailable(null);
      }
    }
  };

  // Uppdatera username i backend
  const handleSaveUsername = async (field, newValue) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/update-username`,
        { username: newValue },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setForm((prev) => ({ ...prev, username: res.data.user.username }));
      login(localStorage.getItem("token"), res.data.user);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        username: err.response?.data?.message || "Could not update username",
      }));
    }
  };

  // Uppdatera email i backend
  const handleSaveEmail = async (field, newValue) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_API_URL}/users/update-email`,
        { email: newValue },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setForm((prev) => ({ ...prev, email: res.data.user.email }));
      login(localStorage.getItem("token"), res.data.user);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        email: err.response?.data?.message || "Could not update email",
      }));
    }
  };

  // Återställ formulär om det kollapsas
  useEffect(() => {
    if (!isExpanded) {
      setErrors({});
      setValid({});
      setUsernameAvailable(null);
      setEmailAvailable(null);
      setUsernameHovered(false);
      setEmailHovered(false);
      if (user) {
        setForm({
          username: user.username || "",
          email: user.email || "",
        });
      }
    }
  }, [isExpanded, user]);

  return (
    <section className="form-container">
      <div
        className="form-header-overlay"
        onClick={onExpand}
        aria-label={isExpanded ? "Collapse" : "Expand"}
      />
      <header className="form-header">
        <h2 className="form-title">Account Settings</h2>
      </header>

      {isExpanded && (
        <div className="form">
          <div className="form-inputs-container">
            <InputFieldEdit
              label="Username"
              name="username"
              value={form.username}
              originalValue={user?.username}
              onSave={handleSaveUsername}
              onCancel={() =>
                setForm((prev) => ({ ...prev, username: user?.username }))
              }
              onChange={handleInputChange}
              error={errors.username}
              valid={valid.username}
              available={usernameAvailable}
              hovered={usernameHovered}
              setHovered={setUsernameHovered}
            />
            <InputFieldEdit
              label="Email"
              name="email"
              type="email"
              value={form.email}
              originalValue={user?.email}
              onSave={handleSaveEmail}
              onCancel={() =>
                setForm((prev) => ({ ...prev, email: user?.email }))
              }
              onChange={handleInputChange}
              error={errors.email}
              valid={valid.email}
              available={emailAvailable}
              hovered={emailHovered}
              setHovered={setEmailHovered}
            />
          </div>
          <Button
            text="Change Password"
            style="full-blue"
            onClick={onChangePasswordClick}
          />
        </div>
      )}
    </section>
  );
}

export default UserSettingsForm;
