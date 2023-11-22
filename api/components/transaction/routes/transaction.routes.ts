import { Router } from "express";
import { transactionController } from "../controllers/transaction.controller";
import { validateTransaction } from "../validators/transaction.validator";

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

    this.router
      .route(`${this.path}webhook`)
      .post(
        validateTransaction.validateSignature,
        transactionController.handleWebHookPayload
      );
  }
}

export const transanctionRoutes = new TransanctionRoutes();
