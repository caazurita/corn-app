import express, { Router } from "express";
import { saleRouter } from "./lib/hexagonal/sale/infrastructure/http/expressSaleRoute";
import cors from "cors";

const app = express();
//**********middlewares*********/
app.use(
  cors({
    origin: "http://localhost:5173", // Vue dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

//**********config routes********
const mainRoute = Router();
mainRoute.use("/sale", saleRouter);

app.use("/api/v1", mainRoute);
const PORT = process.env.PORT || 3000;

//**********start server********
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
