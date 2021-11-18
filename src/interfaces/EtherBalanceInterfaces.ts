export interface AccountBalance {
  account: string;
  balance: number;
}

export interface EthLastPrice {
  ethbtc: string;
  ethbtc_timestamp: string;
  ethusd: string;
  ethusd_timestamp: string;
}

export interface EtherscanReponse {
  status: string;
  message: string;
  result: string | AccountBalance[] | EthLastPrice;
}
