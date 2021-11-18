import { AddressData } from '../interfaces/interfaces';
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

  formatEthPrice():void {
    const eth = 1000000000000000000;
    this.price = this.price / eth;
  }

}
