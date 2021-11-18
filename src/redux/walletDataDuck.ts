import CurrencyService from "../services/CurrencyService";
import EtherscanService from "../services/EtherscanService";
import { formatEthPrice } from "../utils/format";
import { AccountBalance } from "../interfaces/EtherBalanceInterfaces";
import { addressesData } from '../mocks/mocks';
import { AddressData } from "../interfaces/interfaces";
import AddressDataModel from "../models/AddressDataModel";

// Constant
const SET_USD_TO_EUR = "SET_USD_TO_EUR";
const LOADING_PAGE = "LOADING_PAGE";
const CHARG_ADDR_DATA = "CHARG_ADDR_DATA";
const CURRENCY_CHANGE = "CURRENCY_CHANGE";
const ADD_ADDRESS = "ADD_ADDRESS";

interface Action {
  type:
    | typeof SET_USD_TO_EUR
    | typeof LOADING_PAGE
    | typeof CHARG_ADDR_DATA
    | typeof CURRENCY_CHANGE
    | typeof ADD_ADDRESS;
  payload?: any;
}

interface State {
  usdToEur: number;
  currency: "USD" | "EUR";
  loadingPage: boolean;
  addressesData: AddressDataModel[];
}

let initialData: State = {
  usdToEur: 1,
  currency: "USD",
  loadingPage: false,
  addressesData: [],
};

// Reducer
export default function reducer(state :State = initialData, action: Action) {
  switch (action.type) {
    case SET_USD_TO_EUR:
      return { ...state, usdToEur: action.payload };
    case CHARG_ADDR_DATA:
      return { ...state, addressesData: action.payload };
    case CURRENCY_CHANGE:
      return { ...state, currency: action.payload };
    case ADD_ADDRESS:
      console.log(`action`, action)
      const addressesDataAux = state.addressesData;
      addressesDataAux.push(action.payload);
      return { ...state, addressesData: addressesDataAux};
    default:
      return state;
  }
}

// Actions
export const getPriceUSDToEUR = () => async (dispatch: any) => {
  const currencies = "USD_EUR";
  const response = await CurrencyService.getPriceUSDToEUR(currencies);
  dispatch({
    type: SET_USD_TO_EUR,
    payload: response[currencies],
  });
};

export const getAddressesData = () => async (dispatch: any) => {
  const addresses =
    "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a,0x63a9975ba31b0b9626b34300f7f627147df1f526,0x198ef1ec325a96cc354c7266a038be8b5c558f67";
  const response = await EtherscanService.getEtherBalanceForMultAddrs(
    addresses
  );
  const addressesDataFromBack = addressesData;
  const resultEthscan: AccountBalance[] = response.result as AccountBalance[];
  let addressesDataFormated: AddressDataModel[] = [];
  addressesDataFromBack.forEach((item: AddressData, i: number) => {
    item.price = resultEthscan[i].balance;
    const newAddressData = new AddressDataModel(item);
    newAddressData.formatEthPrice();
    addressesDataFormated.push(newAddressData);
  });
  dispatch({
    type: CHARG_ADDR_DATA,
    payload: addressesDataFormated,
  });
};

export const addAddress =
  (address: string) => async (dispatch: any, state: State) => {
    const newModel: AddressData = {
      address,
      price: 0,
      currency: state.currency,
      fav: false,
      firstTransaction: "",
    };
    const newAddressData = new AddressDataModel(newModel);
    newAddressData.formatEthPrice();

    dispatch({
      type: ADD_ADDRESS,
      payload: newAddressData,
    });
  };
