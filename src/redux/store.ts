import { createStore, combineReducers } from "redux";
import walletDataReducer, {getPriceUSDToEUR} from "./ducks/walletDataDuck";
import { getAddressesData } from './ducks/walletDataDuck';

const rootReducer = combineReducers({
  walletData: walletDataReducer,
});


export default function generateStore(){
  const store = createStore(rootReducer);
  getAddressesData()(store.dispatch);
  getPriceUSDToEUR()(store.dispatch);
  return store;
}

