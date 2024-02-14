import { useEffect, useState } from "react";
import { moneyFormat } from "../helpers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Products.css";

const Products = ({
  item,
  basket,
  setBasket,
  money,
  total,
  setInitialBasket,
}) => {
  const basketNumber = basket.find((f) => f.id === item.id);
  const [amountInput, setAmountInput] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCheck, setErrorCheck] = useState(false);

  const addBasket = () => {
    const checkBasket = basket.find((f) => f.id === item.id);
    if (checkBasket) {
      if (total + item.price * amountInput > money) {
        setErrorMessage("Yetersiz bakiye");
        setErrorCheck((prev) => !prev);
      } else if (amountInput < 1) {
        setErrorMessage("Lütfen 0 dan büyük bir sayı giriniz");
        setErrorCheck((prev) => !prev);
      } else {
        checkBasket.amount += parseInt(amountInput);
        setBasket([...basket.filter((f) => f.id !== item.id), checkBasket]);
      }
    } else {
      if (amountInput < 1) {
        setErrorMessage("Lütfen 0 dan büyük bir sayı giriniz");
        setErrorCheck((prev) => !prev);
      } else if (total + item.price * amountInput > money) {
        setErrorMessage("Yetersiz bakiye");
        setErrorCheck((prev) => !prev);
      } else {
        setBasket([
          ...basket,
          {
            id: item.id,
            amount: parseInt(amountInput),
          },
        ]);
      }
    }
    setAmountInput(0);
    setInitialBasket(true);
  };

  const removeBasket = () => {
    const currentBasket = basket.find((f) => f.id === item.id); // find() methot find just a element. when found it doesn't countinous
    const withoutCurrentBasket = basket.filter((f) => f.id !== item.id); // filter() methot find all elment that suitable for conditions. when  found it constionus

    if (currentBasket) {
      if (amountInput < 1) {
        setErrorMessage("Lütfen  0 dan büyük bir sayı giriniz");
        setErrorCheck((prev) => !prev);
      } else if (currentBasket.amount < amountInput) {
        setErrorMessage("Sepetinizde bu kadar ürün bulunmamaktadır");
        setErrorCheck((prev) => !prev);
      } else {
        currentBasket.amount -= parseInt(amountInput);
        if (currentBasket.amount === 0) {
          setBasket([...withoutCurrentBasket]);
        } else {
          setBasket([...withoutCurrentBasket, currentBasket]);
        }
      }
    } else {
      setErrorMessage("Sepetinizde bu ürün bulunmamaktadır");
      setErrorCheck((prev) => !prev);
    }
    setAmountInput(0);
  };

  useEffect(() => {
    if (errorMessage !== "") toast.error(errorMessage);

    console.log("HATA");
  }, [errorCheck]);

  console.log("errorCheck:", errorCheck);
  return (
    <>
      <div className="productcss">
        {console.log("Products.js return")}
        <img src={item.image}></img>
        <h6>{item.title} </h6>
        <div className="price">$ {moneyFormat(item.price)}</div>
        <div className="actions">
          <button
            className="sell-btn"
            disabled={!basketNumber}
            onClick={removeBasket}
          >
            sat
          </button>
          <input
            className="amount"
            placeholder="adet..."
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
          {console.log("amountInput:", amountInput)}
          {/* <span className="amount">
            {basketNumber ? basketNumber.amount : 0}
          </span> */}
          <button
            className="buy-btn"
            disabled={total + item.price > money}
            onClick={addBasket}
          >
            satin al
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
