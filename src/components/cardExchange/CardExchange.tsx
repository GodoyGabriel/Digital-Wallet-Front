import { useEffect, useState } from "react";
import EtherscanService from "../../services/EtherscanService";
import { useDispatch, useSelector } from "react-redux";
import { CURRENCY_CHANGE, ETHER_USD } from "../../redux/walletDataDuck";
import { EthLastPrice } from "../../interfaces/EtherBalanceInterfaces";
import RootState from "../../redux/RootStateInterface";
import CurrencyService from "../../services/CurrencyService";
import Alert from "../alert/Alert";
import { SET_USD_TO_EUR } from "../../redux/walletDataDuck";
import { formatPriceForCurrency } from "../../utils/format";

const initialAlert = { type: "", message: "" };

const CardExchange = () => {
  const dispatch = useDispatch();
  const { priceEthUSD } = useSelector((state: RootState) => state.walletData);
  const [alert, setAlert] = useState(initialAlert);
  const [usdToEur, setUsdToEur] = useState(1);
  const [currencySelect, setCurrencySelect] = useState("USD");
  const [value, setValue] = useState("");

  const getEthPrice = async () => {
    const ethPrice = await EtherscanService.getEtherLastPrice();
    const result: EthLastPrice = ethPrice.result as EthLastPrice;
    const price = ethPrice.status === "1" ? Number(result.ethusd) : 1;
    dispatch({ type: ETHER_USD, payload: price });
  };

  useEffect(() => {
    getEthPrice();
    getPriceUSDToEUR();
  }, []);

  const onchange = (e: string) => {
    setValue(e);
  };

  const getPriceUSDToEUR = async () => {
    const response = await CurrencyService.getPriceUSDToEUR("USD_EUR");
    dispatch({ type: SET_USD_TO_EUR, payload: response.USD_EUR });
    setUsdToEur(response.USD_EUR);
  };

  const getEthValueCurrency = () => {
    if (Number(value)) {
      if (alert.type !== "") {
        setAlert(initialAlert);
      }
      return formatPriceForCurrency({
        value,
        priceEthUSD,
        currencySelect,
        usdToEur,
      });
    } else {
      if (alert.type === "" && value !== "") {
        setAlert({ type: "danger", message: "Tt is not a number" });
      }
      return "0";
    }
  };

  const currencyChange = (currency: string) => {
    setCurrencySelect(currency);
    dispatch({ type: CURRENCY_CHANGE, payload: currency });
  };

  return (
    <>
      <div className="card bg-secondary rounded-0">
        <div className="card-header">Exchange</div>
        <div className="card-body">
          <input
            type="text"
            className="form-control"
            placeholder="Mount"
            id="price"
            value={value}
            onChange={(e) => onchange(e.target.value)}
          />

          <div className="btn-group" role="group" style={{ display: "flex" }}>
            <button
              type="button"
              className={`btn btn-secondary  ${
                currencySelect === "USD" ? "active" : ""
              }`}
              onClick={() => currencyChange("USD")}
            >
              USD
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => currencyChange("EUR")}
            >
              EUR
            </button>
          </div>
          <input
            className="form-control"
            id="readOnlyInput"
            type="text"
            placeholder="Readonly input here..."
            disabled
            value={`ETH ${getEthValueCurrency()}`}
          />
        </div>
      </div>
      {alert.type !== "" && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClick={() => setAlert(initialAlert)}
        />
      )}
    </>
  );
};

export default CardExchange;
