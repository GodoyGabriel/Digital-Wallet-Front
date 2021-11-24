import { alertTypes } from '../types/Types';
export interface AddressData {
  address: string;
  price: number;
  currency: string;
  fav: boolean;
  firstTransaction: string;
  usdToEur?: number;
  priceEthUSD?: number;
}
export interface FormatPriceForCurrency{
  value: string;
  priceEthUSD: number;
  currencySelect: string;
  usdToEur: number;
}

export interface AlertInt {
  type: alertTypes,
  message: string;
}