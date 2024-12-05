import React, { useState } from "react";
import "./Menu.css"; // Import file CSS

const MenuItem = ({ item }) => {
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  return (
    <div className="item-container">
      <img src={item.image} alt={item.name} className="item-image" />
      <h4>{item.name}</h4>
      <p>{item.price} VND</p>
      <div className="quantity-control">
        <button onClick={handleDecrease} className="button">
          -
        </button>
        <span style={{fontSize:'15px', color:'white'}}>{quantity}</span>
        <button onClick={handleIncrease} className="button">
          +
        </button>
      </div>
    </div>
  );
};

const Menu = () => {
    const menuData = [
      {
        text: "Bắp nước",
        items: [
          {
            id: 1,
            name: "Combo 1 bắp + 1 nước",
            price: "79,000",
            image: "https://via.placeholder.com/100",
          },
          {
            id: 2,
            name: "Combo 2 bắp + 2 nước",
            price: "149,000",
            image: "https://via.placeholder.com/100",
          },
        ],
      },
      {
        text: "Nước uống",
        items: [
          {
            id: 3,
            name: "Fanta cam",
            price: "20,000",
            image: "https://via.placeholder.com/100",
          },
          {
            id: 4,
            name: "Pepsi",
            price: "20,000",
            image: "https://via.placeholder.com/100",
          },
        ],
      },
      {
        text: "Snack",
        items: [
          {
            id: 5,
            name: "Snack Lay's Vị BBQ",
            price: "30,000",
            image: "https://via.placeholder.com/100",
          },
          {
            id: 6,
            name: "Snack Lay's Vị Classic",
            price: "30,000",
            image: "https://via.placeholder.com/100",
          },
        ],
      },
    ];

  return (
    <div className="menu-container">
      {menuData.map((section, index) => (
        <div key={index}>
          <h3 className="section-text">{section.text}</h3>
          <div className="items-row">
            {section.items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
