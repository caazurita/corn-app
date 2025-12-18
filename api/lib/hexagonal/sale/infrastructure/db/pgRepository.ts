import { Sale } from "../../domain/Sale";
import { SaleRepository } from "../../domain/SaleRepository";
import { pool } from "../../../../../db";
export class Repository implements SaleRepository {
  sales: Sale[] = [];
  async create(sale: Sale): Promise<any> {
    await pool.query(
      "INSERT INTO sales (name, type, quantity, created_at) VALUES ($1, $2, $3, $4)",
      [sale.name, sale.type, sale.quantity, sale.createdAt]
    );
    return true;
  }

  async getLastSale(): Promise<Sale | null> {
    const result = await pool.query(
      "SELECT * FROM sales ORDER BY created_at DESC LIMIT 1"
    );
    const sale = result.rows[0];
    if (!sale) {
      return null;
    }
    return new Sale(sale.name, sale.type, sale.quantity, sale.created_at);
  }
}
