import "./TextToLink.css";
import ButtonLink from "../../UI/Button/ButtonLink";

function TextToLink({ message, path, style, text }) {
  return (
    <div className="text-to-link-container">
      <p className="text-to-link-message">{message}</p>
      <ButtonLink path={path} style={style} text={text} />
    </div>
  );
}

export default TextToLink;
