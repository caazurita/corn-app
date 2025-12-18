import { Sale } from "./Sale";

export interface SaleRepository {
  create(sale: Sale): Promise<any>;
  getLastSale(): Promise<Sale | null>;
}
