import { Router } from "express";
import { transactionController } from "../controllers/transaction.controller";

class TransanctionRoutes {
  public path = "/";
  public router = Router();

  constructor() {
    this.path;
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router
      .route(`${this.path}:userId/bank-transfer`)
      .post(transactionController.oneTimeAccountPayment);
  }
}

export const transanctionRoutes = new TransanctionRoutes();
