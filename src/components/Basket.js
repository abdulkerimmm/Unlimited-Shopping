import BasketItem from "./BasketItem";
import "./Basket.css";
import { useState } from "react";
const Basket = ({
  basket,
  resetBasket,
  Urunler,
  total,
  setShowBasket,
  setShowShopping,
  setBasket,
}) => {
  const [showOrder, setShowOrder] = useState(false);

  const CompleteOrder = () => {
    setBasket([]);
    setShowShopping(false);
    setShowBasket(false);
  };
  return (
    <>
      <div className="backdrop" onClick={() => setShowBasket(false)}></div>

      <div className="basket-container ">
        {showOrder ? (
          <div className="complete">
            <h1> Tebrikler Siparişleriniz alındı 🎉🥳 </h1>
            <br />
            <h1>En Yakında size teslim edeceğiz 📦 🚚</h1>
            <br />
            <h4>adrese gerek yok biz sizi buluruz 😉</h4>
            <button onClick={CompleteOrder} className="upload2">
              Haydi Tekrar Alışverişe Başla
            </button>
          </div>
        ) : (
          <div>
            <h2>Sepet</h2>
            {total < 1 && <p>Sepetinizde ürün bulunmamaktadır</p>}
            <ul>
              {basket.map((item) => (
                <BasketItem
                  key={item.id}
                  item={item}
                  Urunler={Urunler.find((f) => f.id === item.id)}
                ></BasketItem>
              ))}
            </ul>

            <div className="total">toplam:${total}</div>

            <button className="kapat" onClick={() => setShowBasket(false)}>
              X
            </button>
            <button onClick={() => setShowOrder(true)} className="ode">
              öde
            </button>

            <button className="reset-basket" onClick={resetBasket}>
              sepeti sifirla
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Basket;
