import "../../../styles/ButtonStyles.css";
import ButtonLink from "./ButtonLink";

function ButtonBar({ leftPath, leftText, rightPath, rightText, leftStyle, rightStyle }) {
  return (
    <div className="btn-bar-container">
      <ButtonLink path={leftPath} style={leftStyle} text={leftText} />
      <div>
        <ButtonLink path={rightPath} style={rightStyle} text={rightText} />
      </div>
    </div>
  );
}

export default ButtonBar;
