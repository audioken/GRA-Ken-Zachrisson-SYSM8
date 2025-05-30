import { useState, useEffect } from "react";
import "./FieldStyles.css";

function InputFieldEdit({
  label,
  name,
  value,
  onChange,
  onSave,
  onCancel,
  error,
  valid,
  available,
  type = "text",
  hovered,
  setHovered,
  originalValue, // det ursprungliga värdet (t.ex. user.username)
}) {
  const [editMode, setEditMode] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  // Om value ändras utifrån (t.ex. när user laddas), uppdatera tempValue
  useEffect(() => {
    setTempValue(value);
  }, [value]);

  // Byt label när man redigerar
  const displayLabel = editMode ? `New ${label}` : label;

  // Input ska vara disabled när man inte redigerar
  const inputClass = !editMode
    ? "input-disabled"
    : error || available === false
    ? "input-error"
    : valid && (available === undefined || available)
    ? "input-success"
    : "";

  // Visa penna/check/cancel beroende på mode
  return (
    <div
      className="form-group"
      onMouseEnter={() => setHovered?.(true)}
      onMouseLeave={() => setHovered?.(false)}
    >
      <div className="label-container">
        <label htmlFor={name}>{displayLabel}</label>
        {error && <span className="error">{error}</span>}
        {available === false && (
          <span className="error">{label} already taken</span>
        )}
      </div>

      <input
        id={name}
        name={name}
        type={type}
        value={editMode ? tempValue : value}
        onChange={
          editMode
            ? (e) => {
                setTempValue(e.target.value);
                // Anropa onChange så att realtidssökning och validering sker!
                onChange && onChange(e);
              }
            : undefined
        }
        className={`form-input ${inputClass} ${
          !editMode ? "input-readonly" : ""
        }`}
        autoComplete="off"
        required
        disabled={!editMode}
      />

      {/* Ikoner till höger */}
      {!editMode && (
        <div
          className="icon-container icon-pen"
          onClick={() => setEditMode(true)}
          tabIndex={0}
          aria-label={`Edit ${name}`}
        >
          <i className="fa-solid fa-pen"></i>
        </div>
      )}

      {editMode && (
        <>
          {/* Spara/checkmark */}
          <div
            className="icon-container icon-save"
            onClick={() => {
              // Tillåt spara om det är nytt värde eller samma som original
              if (
                tempValue === originalValue ||
                (valid && (available === undefined || available))
              ) {
                onSave(name, tempValue);
                setEditMode(false);
              }
            }}
            tabIndex={0}
            aria-label={`Save ${name}`}
          >
            <i className="fa-solid fa-check"></i>
          </div>
          {/* Avbryt/kryss */}
          <div
            className="icon-container icon-cancel"
            onClick={() => {
              setTempValue(value);
              setEditMode(false);
              onCancel?.(name);
            }}
            tabIndex={0}
            aria-label={`Cancel ${name}`}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </>
      )}
    </div>
  );
}

export default InputFieldEdit;
