import "./App.css";
import Products from "./components/Products";
import Urunler from "./Urunler.json";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Basket from "./components/Basket";
import { ToastContainer, toast } from "react-toastify";
import BasketButton from "./components/BasketButton";

function App() {
  const [money, setMoney] = useState(1000000);
  const [basket, setBasket] = useState([]);
  const [total, setTotal] = useState(0);
  const [initialBasket, setInitialBasket] = useState(false);
  const [showBasket, setShowBasket] = useState(false);
  const [change, setChange] = useState(false);
  const [showShopping, setShowShopping] = useState(false);
  console.log("setmoney:", money);
  useEffect(() => {
    console.log("App.js useEffect");
    setTotal(
      basket.reduce((acc, item) => {
        return acc + item.amount * Urunler.find((f) => f.id === item.id).price;
      }, 0)
    );
    if (initialBasket) {
      toast.success(" sepet güncellendi");
    }
    setChange(true);
    const timer = setTimeout(() => {
      setChange(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [basket]);

  const resetBasket = () => {
    setBasket([]);
  };
  console.log("showBasket", showBasket);
  return (
    <>
      {!showShopping ? (
        <div className="firstdiv">
          <h1 className="head1">SINIRSIZ PARA SINIRSIZ ALIŞVERİŞ </h1>
          <h2 className="head2">YETERKİ İSTEDİĞİNİZ KADAR ALIŞVERİŞ YAPIN</h2>
          <h3 className="head3">PARANIZ YETMEZSE BİZDEN İSTEYİN</h3>
          <label className="label1">PARANIZI GİRİNİZ</label>
          <input
            className="input1"
            placeholder="$ 1000000"
            onChange={(e) => setMoney(e.target.value)}
          />
          <button className="button1" onClick={() => setShowShopping(true)}>
            ALIŞVERİŞE BAŞLA
          </button>
        </div>
      ) : (
        <div className="App">
          <ToastContainer theme="dark" position="top-left" />
          {console.log("App.js return")}
          <BasketButton
            setShowBasket={setShowBasket}
            showBasket={showBasket}
            change={change}
            basket={basket}
          />
          <div>
            <Header total={total} money={money}></Header>
          </div>
          <button onClick={() => setShowShopping(false)} className="upload">
            paranızmı bitti ? haydi para yükle !
          </button>
          <div className="container products">
            {Urunler.map((item) => {
              return (
                <Products
                  total={total}
                  money={money}
                  key={item.id}
                  basket={basket}
                  setBasket={setBasket}
                  item={item}
                  setInitialBasket={setInitialBasket}
                />
              );
            })}
          </div>

          {showBasket && (
            <Basket
              basket={basket}
              Urunler={Urunler}
              total={total}
              resetBasket={resetBasket}
              setShowBasket={setShowBasket}
              setShowShopping={setShowShopping}
              setBasket={setBasket}
            >
              {" "}
            </Basket>
          )}
        </div>
      )}
    </>
  );
}

export default App;
