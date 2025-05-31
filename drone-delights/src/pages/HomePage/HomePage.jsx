import "./HomePage.css";
import Hero from "../../components/Home/Hero/Hero";
import MenuTeaser from "../../components/Home/MenuTeaser/MenuTeaser";
import MostOrderedItemsList from "../../components/Home/MostOrderedItemsList/MostOrderedItemsList";

function HomePage() {
  return (
    <div className="home-page-container">
      <Hero />
      <div className="home-page-body">
        <MenuTeaser />
        <MostOrderedItemsList />
      </div>
    </div>
  );
}

export default HomePage;
