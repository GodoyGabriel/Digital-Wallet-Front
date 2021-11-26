import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EtherscanService from "../services/EtherscanService";
import { CURRENCY_CHANGE, ETHER_USD } from "../redux/ducks/walletDataDuck";
import { EthLastPrice } from "../interfaces/EtherBalanceInterfaces";
import RootState from "../redux/RootStateInterface";
import CurrencyService from "../services/CurrencyService";
import { SET_USD_TO_EUR } from "../redux/ducks/walletDataDuck";
import { formatPriceForCurrency } from "../utils/format";
import { AlertInt } from "../interfaces/interfaces";
import { currencies } from "../types/Types";
import DigitalWalletService from "../services/DigitalWalletService";

const initialAlert: AlertInt = { type: "", message: "" };

const useExchange = () => {
  const dispatch = useDispatch();
  const { priceEthUSD } = useSelector((state: RootState) => state.walletData);
  const [alert, setAlert] = useState(initialAlert);
  const [usdToEur, setUsdToEur] = useState(1);
  const [updateEthPrice, setUpdateEthPrice] = useState(false);
  const [currencySelect, setCurrencySelect] = useState<currencies>("USD");
  const [amountFormated, setAmountFormated] = useState(0);
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
    // eslint-disable-next-line
  }, []);

  const onchange = (e: string) => {
    if (updateEthPrice) setUpdateEthPrice(false);
    setValue(e);
  };

  const getPriceUSDToEUR = async () => {
    const response = await CurrencyService.getPriceUSDToEUR("USD_EUR");
    dispatch({ type: SET_USD_TO_EUR, payload: response.USD_EUR });
    setUsdToEur(response.USD_EUR);
  };

  const getEthValueCurrency = () => {
    if (Number(value) && value) {
      if (alert.type !== "") {
        setAlert(initialAlert);
      }
      const amountFormated = formatPriceForCurrency({
        value,
        priceEthUSD,
        currencySelect,
        usdToEur,
      });
      DigitalWalletService.exchangeSave({
        currency: currencySelect,
        amount: amountFormated,
      });
      setAmountFormated(amountFormated);
    } else {
      if (alert.type === "" && value !== "") {
        setAlert({ type: "danger", message: "Tt is not a number" });
      }
    }
  };

  const currencyChange = (currency: currencies) => {
    setCurrencySelect(currency);
    getEthPrice();
    getPriceUSDToEUR();
    if (!updateEthPrice) setUpdateEthPrice(true);
    getEthValueCurrency();
    dispatch({ type: CURRENCY_CHANGE, payload: currency });
  };

  const buttonActive = (currency: currencies) => {
    if (updateEthPrice) {
      return currency === currencySelect ? true : false;
    }
  };

  return {
    buttonActive,
    currencyChange,
    onchange,
    alert,
    amountFormated,
    value,
    setAlert,
  };
};

export default useExchange;
