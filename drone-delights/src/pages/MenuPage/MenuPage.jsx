import "./MenuPage.css";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import MenuList from "../../components/MenuList/MenuList";
import PageHeader from "../../components/PageHeader/PageHeader";
import { CategoryProvider } from "../../context/CategoryContext";

function MenuPage() {
  return (
    <CategoryProvider>
      <div className="menu-page-container">
        <PageHeader pageTitleBlue="Our" pageTitleRed="Menu!" />
        <CategoryFilter />
        <MenuList />
      </div>
    </CategoryProvider>
  );
}

export default MenuPage;
