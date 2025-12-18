import { NextFunction, Request, response, Response } from "express";
import { CreateSale } from "../../app/create/createSale";
import { Repository } from "../db/pgRepository";
import { SaleTooManyRequestError } from "../../domain/SaleTooManyRequestError";
import { GetTotalSale } from "../../app/get/getTotalSale";

const repository = new Repository();

export class ExpressSaleController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, type, quantity } = req.body;

      const service = new CreateSale(repository);
      await service.run({ name, type, quantity });

      return res.status(200).json({
        success: true,
        message: "Sale created successfully",
        data: [],
      });
    } catch (e) {
      if (e instanceof SaleTooManyRequestError) {
        return res.status(e.status).json({
          success: false,
          message: e.message,
          data: [],
        });
      } else {
        console.error("Error creating sale:");
        next(e);
      }
    }
  }

  async getTotalSales(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new GetTotalSale(repository);
      const sales = await service.run();

      return res.status(200).json({
        success: true,
        message: "Total sales retrieved successfully",
        data: sales,
      });
    } catch (e) {
      console.error("Error retrieving total sales:");
      next(e);
    }
  }
}
