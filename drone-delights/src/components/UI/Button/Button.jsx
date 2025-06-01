import "../../../styles/ButtonStyles.css";

function Button({ text, type="button", onClick, style = "full", className = "", isDisabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style} ${className}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default Button;
