import ButtonLink from "../UI/Button/ButtonLink";
import "./HomeIntro.css";

function HomeIntro() {
  return (
    <div className="home-intro-container">
      <div className="home-intro-text-container">
        <h2 className="home-intro-text">
          Get your favourite food as fast as possible with our food drones.
          <br />
          <br />
          Keeping it fresh all the way to your belly!
        </h2>
      </div>
      <ButtonLink path={"/menu"} style={"full"} text={"See Menu"} />
    </div>
  );
}

export default HomeIntro;
