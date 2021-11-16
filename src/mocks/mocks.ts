import { tabType } from "../types/Types";

export const tabs: tabType[] = [
  { id: "all", title: "All", sort: "all" },
  { id: "favs", title: "Favs", sort: "fav" },
  { id: "old", title: "Old", sort: "old" },
];

export const tableHeader = ["Address","Mount", "Currency", ""];

export const addressesData = [
  {
    address: "0xddbd2b932c763ba5b1b7ae3b362eac3e8d40121a",
    price: 3000,
    currency: "USD",
    fav: true,
    firstTransaction: "15/05/2021",
  },
  {
    address: "0x63a9975ba31b0b9626b34300f7f627147df1f526",
    price: 230,
    currency: "USD",
    fav: false,
    firstTransaction: "15/05/2021",
  },
  {
    address: "0x198ef1ec325a96cc354c7266a038be8b5c558f67",
    price: 1600,
    currency: "USD",
    fav: true,
    firstTransaction: "15/05/2021",
  },
];