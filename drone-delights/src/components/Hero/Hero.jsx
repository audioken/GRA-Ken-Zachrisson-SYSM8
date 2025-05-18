import "./Hero.css";
import waveyBackground from "../../assets/images/wavey-background-home.svg";
import droneCarryBurger from "../../assets/images/drone-delights-logo.png";

function Hero() {
  return (
    <section className="hero-section">
      <div className="image-container">
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
      <div className="intro-text-and-btn-container">
        <div className="intro-text-container">
          <h2 className="intro-text">
            Get your favourite food as fast as possible with our food drones.
            <br />
            <br />
            Keeping it fresh all the way to your belly!
          </h2>
        </div>
        <button className="see-menu-btn">See Menu</button>
      </div>
    </section>
  );
}

export default Hero;
