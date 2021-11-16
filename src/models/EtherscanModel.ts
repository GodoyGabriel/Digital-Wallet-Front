import { action } from "../types/EtherBalanceTypes";

export default class EtherscanModel {
  apikey: string;
  module: string = "account";
  tag: string = "latest"
  action: action;
  address: string;
  startblock: number = 0;
  endblock: number = 99999999;
  page: number = 1;
  offset: number = 10;
  sort: "asc" | "desc" = "desc";

  constructor(parameters: any) {
    this.apikey = parameters.apikey;
    this.action = parameters.action;
    this.address = parameters.address;
  }

  get getBodyForBalanceAddr() {
    return {
      module: this.module,
      action: this.action,
      address: this.address,
      tag: this.tag,
      apikey: this.apikey,
    };
  }

  get getBodyForEthLastPrice() {
    return {
      apikey: this.apikey,
      module: this.module,
      action: this.action,
    };
  }

  get getBodyForTransactionsForAddress() {
    return {
      apikey: this.apikey,
      module: this.module,
      action: this.action,
      address: this.address,
      startblock: this.startblock,
      endblock: this.endblock,
      page: this.page,
      offset: this.offset,
      sort: this.sort,
    };
  }
}
