import { EtherscanReponse } from "../interfaces/EtherBalanceInterfaces";
import axios from "axios";
import EtherscanModel from "../models/EtherscanModel";

const reqResApi = axios.create({
  baseURL: "https://api.etherscan.io/api",
});

const apikey = "NSZCD6S4TKVWRS13PMQFMVTNP6H7NAGHUY";

export default class EtherscanService {
  static async getEtherBalanceForSingleAddr(
    address: string
  ): Promise<EtherscanReponse> {
    const EthscanModel = new EtherscanModel({
      apikey,
      address,
      action: "balance",
    });
    const response = await reqResApi.get<EtherscanReponse>("", {
      params: { ...EthscanModel.getBodyForBalanceAddr },
    });
    return response.data;
  }

  static async getEtherBalanceForMultAddrs(
    address: string
  ): Promise<EtherscanReponse> {
    const EthscanModel = new EtherscanModel({
      apikey,
      address,
      action: "balancemulti",
    });
    const response = await reqResApi.get<EtherscanReponse>("", {
      params: { ...EthscanModel.getBodyForBalanceAddr },
    });
    return response.data;
  }

  static async getTransactionsForAddress(
    address: string
  ): Promise<EtherscanReponse> {
    const EthscanModel = new EtherscanModel({
      apikey,
      address,
      action: "txlist",
    });
    const response = await reqResApi.get<EtherscanReponse>("", {
      params: { ...EthscanModel.getBodyForTransactionsForAddress },
    });
    return response.data;
  }

  static async getEtherLastPrice(): Promise<EtherscanReponse> {
    const EthscanModel = new EtherscanModel({ apikey, action: "ethprice" });
    const response = await reqResApi.get<EtherscanReponse>("", {
      params: { ...EthscanModel.getBodyForEthLastPrice },
    });
    return response.data;
  }
}
