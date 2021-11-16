import { AccountBalance } from '../interfaces/EtherBalanceInterfaces';
export const formatEthPrice = (data: AccountBalance[]) => {
  const eth = 1000000000000000000;
  data.forEach((item: AccountBalance) => {
    item.balance = Number(item.balance) / eth;
  })
  return data;
}