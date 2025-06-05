import "../../../styles/ButtonStyles.css";
import { Link } from "react-router-dom";

function ButtonLink({ path, style, text, onClick, className = "" }) {
  return (
    <Link
      to={path}
      className={`button-link ${style} ${className}`}
      onClick={onClick}
    >
      {style === "return" ? `< ${text}` : text}
    </Link>
  );
}

export default ButtonLink;
