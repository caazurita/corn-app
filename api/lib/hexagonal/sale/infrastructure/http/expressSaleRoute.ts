import { Router } from "express";
import { ExpressSaleController } from "./expressSaleController";

const controller = new ExpressSaleController();

const saleRouter = Router();
saleRouter.post("/createSale", controller.create);
saleRouter.get("/getTotalSales", controller.getTotalSales);

export { saleRouter };
