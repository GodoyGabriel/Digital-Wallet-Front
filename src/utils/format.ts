import { AccountBalance } from "../interfaces/EtherBalanceInterfaces";
import { FormatPriceForCurrency } from "../interfaces/interfaces";
export const formatEthPrice = (data: AccountBalance[]) => {
  const eth = 1000000000000000000;
  data.forEach((item: AccountBalance) => {
    item.balance = Number(item.balance) / eth;
  });
  return data;
};

export const formatPriceForCurrency = ({
  value,
  priceEthUSD,
  currencySelect,
  usdToEur,
}: FormatPriceForCurrency) => {
  const resultInUSD = Number(value) / priceEthUSD;
  if (currencySelect === "USD") {
    return resultInUSD;
  } else {
    return resultInUSD * usdToEur;
  }
};
