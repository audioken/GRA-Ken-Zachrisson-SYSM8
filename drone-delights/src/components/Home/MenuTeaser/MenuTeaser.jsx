import "../../../styles/TypographyStyles.css";
import "./MenuTeaser.css";
import ButtonLink from "../../UI/Button/ButtonLink";

function MenuTeaser() {
  return (
    <div className="menu-teaser-container">
      <div className="menu-teaser-text-container">
        <p className="menu-teaser-text">
          Get your favourite food as fast as possible with our food drones.
          <br />
          <br />
          Keeping it fresh all the way to your belly!
        </p>
      </div>
      <ButtonLink path={"/menu"} style={"full"} text={"See Menu"} />
    </div>
  );
}

export default MenuTeaser;
