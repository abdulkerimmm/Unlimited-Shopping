import { moneyFormat } from "../helpers";
import "./Header.css";

const Header = ({ total, money }) => {
  return (
    <>
      {total > 0 && total - money !== 0 && (
        <>
          <div className="Header">
            {" "}
            harcamak icin <span>$ {moneyFormat(money - total)}</span> paraniz
            kaldi{" "}
          </div>
        </>
      )}

      {total === 0 && (
        <>
          <div className="Header">
            harcamak icin <span>$ {moneyFormat(money)}</span> paraniz kaldi
          </div>
        </>
      )}

      {total - money === 0 && (
        <>
          <div className="Header">paraniz bitti!</div>
        </>
      )}
    </>
  );
};

export default Header;
