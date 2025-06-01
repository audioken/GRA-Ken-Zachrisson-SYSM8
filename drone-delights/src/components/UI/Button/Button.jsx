import "../../../styles/ButtonStyles.css";

function Button({ text, type, onClick, style = "full", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style} ${className}`}
    >
      {text}
    </button>
  );
}

export default Button;
