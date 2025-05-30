import "./FieldStyles.css"; // Importera CSS för fältet
import "../../../styles/ButtonStyles.css"; // Importera gemensamma knappar

function InputField({
  label,
  name,
  value,
  onChange,
  onClear,
  error,
  valid,
  readOnly,
  disabled,
  available, // t.ex. usernameAvailable
  type = "text",
  hovered,
  setHovered,
}) {
  // const showClear = value && (!valid || hovered); 
  const showClear = !readOnly && hovered && value; // Visa X bara vid redigering och hover

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
        readOnly={readOnly}
        disabled={disabled}
        className={`${inputClass} ${readOnly ? "input-readonly" : ""}`}
        autoComplete="off"
        required
      />

      {showClear && (
        <span
          className="clear-button"
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
