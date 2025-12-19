import { SaleRepository } from "../../domain/SaleRepository";
import { SaleTooManyRequestError } from "../../domain/SaleTooManyRequestError";

export class CreateSale {
  timer = 60_000;
  constructor(private saleRepository: SaleRepository) {}

  async run(props: { name: string; type: string; quantity: number }) {
    try {
      const now = new Date();
      const lastSale = await this.saleRepository.getLastSale();
      if (lastSale) {
        const diffInMs = now.getTime() - lastSale.createdAt.getTime();
        if (diffInMs < this.timer) {
          throw new SaleTooManyRequestError(
            "Only one request per minute is allowed."
          );
        }
      }
      await this.saleRepository.create({
        ...props,
        createdAt: now,
      });
      return true;
    } catch (error) {
      throw error;
    }
  }
}
