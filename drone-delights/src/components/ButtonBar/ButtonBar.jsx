import "./ButtonBar.css";
import ButtonLink from "../ButtonLink/ButtonLink";

function ButtonBar({ leftPath, leftText, rightPath, rightText }) {
  return (
    <div className="btn-bar-container">
      <ButtonLink path={leftPath} style={"return"} text={leftText} />
      <ButtonLink path={rightPath} style={"full"} text={rightText} />
    </div>
  );
}

export default ButtonBar;