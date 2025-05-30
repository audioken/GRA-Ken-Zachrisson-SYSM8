import "./HomePage.css";
import Hero from "../../components/Layout/Hero/Hero";
import HomeIntro from "../../components/Home/HomeIntro";
import MostOrderedList from "../../components/Home/MostOrderedList/MostOrderedList";

function HomePage() {
  return (
    <div className="home-page-container">
      <Hero />
      <div className="home-page-body">
        <HomeIntro />
        <MostOrderedList />
      </div>
    </div>
  );
}

export default HomePage;
