import "./MenuList.css";
import useFetch from "../../hooks/useFetch";
import ItemCard from "../ItemCard/ItemCard";
import { useEffect, useState } from "react";

function MenuList() {
    const { data, loading, error } = useFetch("http://localhost:3001/items");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading items.</p>;
    if (!data) return null;

    const items = data;
    
    return ( 
    <div className="menu-list-container">
        <div className="item-cards-container">
            {items.map((item) => (
                <ItemCard
                    key={item.id}
                    image={item.img}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                />
            ))}
        </div>
    </div>
    );
}

export default MenuList;