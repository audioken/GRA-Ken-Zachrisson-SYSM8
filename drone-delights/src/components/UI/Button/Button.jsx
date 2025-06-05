import "../../../styles/ButtonStyles.css";

function Button({
  text,
  type = "button",
  onClick,
  style,
  className = "",
  isDisabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`hl ${style} ${className}`}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}

export default Button;
