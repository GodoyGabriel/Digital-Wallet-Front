import axios from "axios";
import { AddressesDataResponse } from "../interfaces/digitalWalletBackInt";
import { Exchange } from '../interfaces/interfaces';

const reqResApi = axios.create({
  baseURL: process.env.REACT_APP_DIGITAL_WALLET_URL,
});

export default class DigitalWalletService {
  static async getAddresses(): Promise<AddressesDataResponse> {
    const response = await reqResApi.get<AddressesDataResponse>(
      "/addressesData/getAll"
    );
    return response.data;
  }

  static async exchangeSave(exchange: Exchange): Promise<AddressesDataResponse> {
    const response = await reqResApi.post<AddressesDataResponse>(
      "/exchangeHistory/create", exchange
    );
    return response.data;
  }
}
