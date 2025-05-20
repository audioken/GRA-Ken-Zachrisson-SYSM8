import "./ButtonLink.css";
import { Link } from "react-router-dom";

function ButtonLink({ path, style, text }) {
  return (
    <Link to={path} className={`button-link ${style}`}>
      {style === "return" ? `< ${text}` : text}
    </Link>
  );
}

export default ButtonLink;
