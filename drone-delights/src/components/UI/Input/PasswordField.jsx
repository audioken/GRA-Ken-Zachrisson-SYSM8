import "../../../styles/FieldStyles.css";

function PasswordField({
  label,
  name,
  value,
  onChange,
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
        <label className="label-title" htmlFor={name}>
          {label}
        </label>
        {error && <span className="error">{error}</span>}
      </div>

      <div className="input-wrapper">
        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`form-input ${inputClass}`}
          autoComplete="off"
          required
        />

        {hovered && (
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <div className="icon-wrapper hl-icon">
              <i
                className={`fa-solid ${
                  showPassword ? "fa-eye" : "fa-eye-slash"
                }`}
              ></i>
            </div>
          </span>
        )}

        {showCheck && (
          <span className="input-checkmark icon-wrapper">
            <i className="fa-solid fa-check"></i>
          </span>
        )}
      </div>
    </div>
  );
}

export default PasswordField;
