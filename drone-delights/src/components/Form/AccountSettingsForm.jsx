import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { validateInputs } from "../../utils/validateInputs";
import InputFieldEdit from "./InputFieldEdit";

function AccountSettingsForm() {
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [usernameHovered, setUsernameHovered] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState({});
  const { user, login } = useAuth();

  const [form, setForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  // Live-validering och tillgänglighetskontroll
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Validera
    const { errors, valid } = validateInputs(updatedForm);
    setErrors(errors);
    setValid(valid);

    // Kolla tillgänglighet
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

  // Spara username
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
      // Uppdatera user i context/localStorage om du vill:
      login(localStorage.getItem("token"), res.data.user);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        username: err.response?.data?.message || "Could not update username",
      }));
    }
  };

  // Spara email
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

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  return (
    <div className="form-container account-settings-container">
      <div className="form-header">
        <h2 className="form-title">Account Settings</h2>
      </div>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
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
          onCancel={() => setForm((prev) => ({ ...prev, email: user?.email }))}
          onChange={handleInputChange}
          error={errors.email}
          valid={valid.email}
          available={emailAvailable}
          hovered={emailHovered}
          setHovered={setEmailHovered}
        />
      </form>
    </div>
  );
}

export default AccountSettingsForm;