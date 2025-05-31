import "./MenuPage.css";
import MenuFilter from "../../components/Menu/MenuFilter/MenuFilter";
import MenuItemsList from "../../components/Menu/MenuItemsList/MenuItemsList";
import TitleHeader from "../../components/Layout/TitleHeader/TitleHeader";
import { CategoryProvider } from "../../context/CategoryContext";

function MenuPage() {
  return (
    <CategoryProvider>
      <div className="menu-page-container">
        <TitleHeader pageTitleBlue="Our" pageTitleRed="Menu!" />
        <div className="menu-page-body">
          <MenuFilter />
          <MenuItemsList />
        </div>
      </div>
    </CategoryProvider>
  );
}

export default MenuPage;
