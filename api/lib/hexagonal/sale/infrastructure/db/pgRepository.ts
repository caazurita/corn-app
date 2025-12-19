import { Sale } from "../../domain/Sale";
import { SaleRepository, TotalSale } from "../../domain/SaleRepository";
import { pool } from "../../../../../db";
export class Repository implements SaleRepository {
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

  async getTotalSales(): Promise<TotalSale[] | []> {
    const result = await pool.query(
      `SELECT type, SUM(quantity) as sold
       FROM sales
       GROUP BY type
       ORDER BY sold DESC`
    );
    if (result.rows.length === 0) {
      return [];
    }
    const totalSale: TotalSale[] = [];
    for (const row of result.rows) {
      const newSale: TotalSale = {
        name: "corn",
        type: row.type,
        quantity: 0,
        sold: parseInt(row.sold),
        createdAt: new Date(),
      };
      totalSale.push(newSale);
    }
    return totalSale;
  }
}
