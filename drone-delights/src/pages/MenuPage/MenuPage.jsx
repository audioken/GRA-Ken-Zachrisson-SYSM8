import "./MenuPage.css";
import CategoryFilter from "../../components/Menu/CategoryFilter/CategoryFilter";
import MenuList from "../../components/Menu/MenuList/MenuList";
import PageHeader from "../../components/Layout/PageHeader/PageHeader";
import { CategoryProvider } from "../../context/CategoryContext";

function MenuPage() {
  return (
    <CategoryProvider>
      <div className="menu-page-container">
        <PageHeader pageTitleBlue="Our" pageTitleRed="Menu!" />
        <div className="menu-page-body">
          <CategoryFilter />
          <MenuList />
        </div>
      </div>
    </CategoryProvider>
  );
}

export default MenuPage;
