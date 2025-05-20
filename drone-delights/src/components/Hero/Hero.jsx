import "./Hero.css";
import waveyBackground from "../../assets/images/wavey-background-home.svg";
import droneCarryBurger from "../../assets/images/drone-delights-logo.png";
import { Link } from "react-router-dom";
import MostOrderdList from "../MostOrderedList/MostOrderedList";
import ButtonLink from "../ButtonLink/ButtonLink";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-top-section">
        <img
          src={droneCarryBurger}
          alt="Drone Carrying Burger"
          className="drone-carry-burger"
        />
        <div className="slogan-container">
          <h1 className="slogan">
            <span className="slogan-part-one">
              It's hovered to <br />
              your <br />
            </span>
            <span className="slogan-part-two">doorstep!</span>
          </h1>
        </div>
        <img
          src={waveyBackground}
          alt="Wavey Background"
          className="wavey-background"
        />
      </div>
      <div className="hero-bottom-section">
        <div className="intro-text-btn-container">
          <div className="intro-text-container">
            <h2 className="intro-text">
              Get your favourite food as fast as possible with our food drones.
              <br />
              <br />
              Keeping it fresh all the way to your belly!
            </h2>
          </div>
          <ButtonLink path={"/menu"} style={"full"} text={"See Menu"} />
        </div>
        <MostOrderdList />
      </div>
    </section>
  );
}

export default Hero;
