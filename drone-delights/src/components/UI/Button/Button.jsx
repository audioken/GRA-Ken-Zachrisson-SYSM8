import "../../../styles/ButtonStyles.css";

function Button({ text, onClick, style = "full", className = "" }) {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`button-link ${style} ${className}`}
    >
      {style === "return" ? `< ${text}` : text}
    </button>
  );
}

export default Button;
