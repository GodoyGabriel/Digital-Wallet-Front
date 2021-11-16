import CurrencyService from '../services/CurrencyService';
import EtherscanService from '../services/EtherscanService';
import { formatEthPrice } from '../utils/format';
import { AccountBalance } from '../interfaces/EtherBalanceInterfaces';
// Constant
const SET_USD_TO_EUR = "SET_USD_TO_EUR";
const LOADING_PAGE = "LOADING_PAGE";

interface Action {
  type: typeof SET_USD_TO_EUR | typeof LOADING_PAGE;
  payload?: any;
}


let initialData = {
  usdToEur: 1,
  loadingPage: false,
  addressesData: [],
};

// Reducer
export default function reducer(state = initialData, action: Action) {
  switch (action.type) {
    case SET_USD_TO_EUR:
      return { ...state, usdToEur: action.payload};
    default:
      return state;
  }
}

// Actions
export const getPriceUSDToEUR = () => async(dispatch: any) => {
  const currencies = "USD_EUR";
  const response = await CurrencyService.getPriceUSDToEUR(currencies);
  dispatch({
    type: SET_USD_TO_EUR,
    payload: response[currencies],
  });
};

export const getAddressesData = () => async (dispatch: any) => {
  const addresses = "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67";
  const response = await EtherscanService.getEtherBalanceForMultAddrs(addresses);
  const eth = 1000000000000000000;
  console.log(`response`, response.result);
  console.log(formatEthPrice(response.result as AccountBalance[]))
}
