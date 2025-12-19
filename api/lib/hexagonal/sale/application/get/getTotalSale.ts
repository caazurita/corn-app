import { SaleRepository } from "../../domain/SaleRepository";
import { SaleTooManyRequestError } from "../../domain/SaleTooManyRequestError";

export class GetTotalSale {
  timer = 60_000;
  constructor(private saleRepository: SaleRepository) {}

  async run() {
    try {
      const sales = await this.saleRepository.getTotalSales();
      return sales;
    } catch (error) {
      throw error;
    }
  }
}
