import "../../../styles/FieldStyles.css";
import "../../../styles/ButtonStyles.css";

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
  available,
  type = "text",
  hovered,
  setHovered,
}) {
  const isAvailable = available === undefined || available;
  const showClear = !readOnly && hovered && value; // Visa X bara vid redigering och hover
  const showCheck = !hovered && valid && isAvailable; // Visa check om valid + ev. available

  const inputClass =
    error || available === false
      ? "input-error"
      : valid && isAvailable
      ? "input-success"
      : "";

  return (
    <div
      className="form-group"
      onMouseEnter={() => setHovered?.(true)}
      onMouseLeave={() => setHovered?.(false)}
    >
      <div className="label-container">
        <label className="label-title" htmlFor={name}>
          {label}
        </label>
        {error && (
          <span className="error" role="alert">
            {error}
          </span>
        )}
        {available === false && (
          <span className="error" role="alert">
            {label} occupied
          </span>
        )}
      </div>

      <div className="input-wrapper">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          disabled={disabled}
          className={`form-input ${inputClass} ${
            readOnly ? "input-readonly" : ""
          }`}
          autoComplete="off"
          required
        />

        {showClear && (
          <button
            className="clear-button icon-wrapper"
            onClick={onClear}
            tabIndex={0}
            aria-label={`Clear ${name}`}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
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

export default InputField;
