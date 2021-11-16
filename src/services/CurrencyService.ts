import axios from "axios";

const reqResApi = axios.create({
  baseURL: "https://free.currconv.com/api/v7/convert",
});
const api_key = "cad1e7c091e3488ee924";

export default class CurrencyService {
  static async getPriceUSDToEUR (currencies: string){
    const response = await reqResApi.get("", {
      params: { q: currencies, compact: "ultra", apiKey: api_key},
    });
    return response.data;
  }
}