import axios from "axios";

const reqResApi = axios.create({
  baseURL: process.env.REACT_APP_ETH_URL,
});
const api_key = process.env.REACT_APP_ETH_API_KEY;

export default class CurrencyService {
  static async getPriceUSDToEUR(currencies: string) {
    let response = { data: { USD_EUR: 1 } };
    await reqResApi
      .get("", {
        params: { q: currencies, compact: "ultra", apiKey: api_key },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        // Previously the api stopped working
        response.data.USD_EUR = 0.89;
      });
    return response.data;
  }
}
