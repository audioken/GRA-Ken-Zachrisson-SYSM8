import "./MenuPage.css";
import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import MenuList from "../../components/MenuList/MenuList";
import PageHeader from "../../components/PageHeader/PageHeader";

function MenuPage() {
  return (
    <div className="menu-page-container">
      <PageHeader pageTitleBlue="Our" pageTitleRed="Menu!" />
      <CategoryFilter />
      <MenuList />
    </div>
  );
}

export default MenuPage;
