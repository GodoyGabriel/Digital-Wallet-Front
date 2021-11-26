export interface AddressesDataResponse {
  message?: string;
  data: AddressesData[];
}

export interface AddressesData {
  id: any;
  fav: boolean;
  address: string;
}