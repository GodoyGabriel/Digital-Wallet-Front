import { AddressData } from '../interfaces/interfaces';
import {useSelector} from "react-redux";
export default class AddressDataModel {
  address: string;
  price: number;
  currency: string;
  fav: boolean;
  firstTransaction: string;  
  usdToEur: number = 1;
  constructor(data: AddressData) {
    this.address = data.address;
    this.price = data.price;
    this.currency = data.currency;
    this.fav = data.fav;
    this.firstTransaction = data.firstTransaction;
    this.usdToEur = data.usdToEur || 1;
  }

}
