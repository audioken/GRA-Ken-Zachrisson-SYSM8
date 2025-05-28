import "./FieldStyles.css"; // Importera CSS för fältet

function InputField({
  label,
  name,
  value,
  onChange,
  onClear,
  error,
  valid,
  available, // t.ex. usernameAvailable
  type = "text",
  hovered,
  setHovered,
}) {
  const showClear = value && (!valid || hovered); // Visa X om ogiltig eller hover

  const showCheck = !hovered && valid && (available === undefined || available); // Visa check om valid + ev. available

  const inputClass =
    error || available === false
      ? "input-error"
      : valid && (available === undefined || available)
      ? "input-success"
      : "";

  return (
    <div
      className="form-group"
      onMouseEnter={() => setHovered?.(true)}
      onMouseLeave={() => setHovered?.(false)}
    >
      <div className="label-container">
        <label htmlFor={name}>{label}</label>
        {error && <span className="error">{error}</span>}
        {available === false && (
          <span className="error">{label} already taken</span>
        )}
      </div>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={inputClass}
        autoComplete="off"
        required
      />

      {showClear && (
        <span
          className="clear-input"
          onClick={onClear}
          tabIndex={0}
          aria-label={`Clear ${name}`}
        >
          <i className="fa-solid fa-xmark"></i>
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

export default InputField;
