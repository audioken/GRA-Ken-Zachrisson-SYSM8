import { createContext, useState } from "react";

export const CategoryContext = createContext();

export function CategoryProvider({ children }) {
  const [categories] = useState([
    "All",
    "Food",
    "Desserts",
    "Drinks",
    "Favorites",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <CategoryContext.Provider
      value={{ categories, selectedCategory, setSelectedCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
}
