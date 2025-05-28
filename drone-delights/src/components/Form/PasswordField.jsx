import "./FieldStyles.css"; // Importera CSS för fältet

function PasswordField({
  label,
  name,
  value,
  onChange,
  onClear,
  error,
  valid,
  hovered,
  setHovered,
  showPassword,
  setShowPassword,
}) {
  const inputClass = error ? "input-error" : valid ? "input-success" : "";

  const showCheck = !hovered && valid && value;

  return (
    <div
      className="form-group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="label-container">
        <label htmlFor={name}>{label}</label>
        {error && <span className="error">{error}</span>}
      </div>

      <input
        id={name}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={inputClass}
        autoComplete="off"
        required
      />

      {hovered && (
        <span
          className="password-toggle"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={0}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <div className="icon-container">
            <i
              className={`fa-solid ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              }`}
            ></i>
          </div>
        </span>
      )}

      {showCheck && (
        <span className="input-checkmark">
          <i className="fa-solid fa-check"></i>
        </span>
      )}
    </div>
  );
}

export default PasswordField;
