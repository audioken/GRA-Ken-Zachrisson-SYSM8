import CategoryFilter from "../../components/CategoryFilter/CategoryFilter";
import MenuList from "../../components/MenuList/MenuList";

function MenuPage() {
  return (
    <div className="menu-page-container">
      <CategoryFilter />
      <MenuList />
    </div>
  );
}

export default MenuPage;
