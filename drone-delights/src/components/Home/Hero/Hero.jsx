import "./Hero.css";
import "../../../styles/TypographyStyles.css";
import waveyBackground from "../../../assets/images/wavey-background-home.svg";
import droneCarryBurger from "../../../assets/images/drone-delights-logo.png";

function Hero() {
  return (
    <section className="hero-section">
      <img
        src={droneCarryBurger}
        alt="Drone Carrying Burger"
        className="drone-carry-burger"
      />
      <div className="slogan-container">
        <h1>
          <span className="title-header-blue">
            It's hovered to <br />
            your <br />
          </span>
          <span className="title-header-red">doorstep!</span>
        </h1>
      </div>
      <img
        src={waveyBackground}
        alt="Wavey Background"
        className="wavey-background"
      />
    </section>
  );
}

export default Hero;
