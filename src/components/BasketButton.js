import React from "react";
import "./BasketButton.css";
import CartIcon from "./CartIcon";

const BasketButton = ({ setShowBasket, basket, change }) => {
  const amount = basket.reduce((acc, item) => {
    return acc + item.amount;
  }, 0);
  return (
    <button
      className={change ? "buttonBasket bump" : "buttonBasket"}
      onClick={() => {
        setShowBasket(true);
      }}
    >
      <span className="icon">
        <CartIcon />
      </span>
      <span>Sepetiniz</span>
      <span className="badge">{amount}</span>
    </button>
  );
};

export default BasketButton;
