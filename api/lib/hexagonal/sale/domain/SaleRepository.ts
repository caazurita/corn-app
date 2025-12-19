import { Sale } from "./Sale";

export interface TotalSale extends Sale {
  sold: number;
}

export interface SaleRepository {
  create(sale: Sale): Promise<any>;
  getLastSale(): Promise<Sale | null>;
  getTotalSales(): Promise<TotalSale[] | []>;
}
