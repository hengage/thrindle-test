import { Router } from "express";
import { transactionController } from "../controllers/transaction.controller";
import { validateTransaction } from "../validators/transaction.validator";
import { authMiddleware } from "../../../middleware";

class TransanctionRoutes {
  public path = "/";
  public router = Router();

  constructor() {
    this.path;
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router
      .route(`${this.path}webhook`)
      .post(
        validateTransaction.validateSignature,
        transactionController.handleWebHookPayload
      );

    this.router.use(authMiddleware.verifyToken)
    this.router
      .route(`${this.path}:userId/dynamic-bank-transfer`)
      .post(transactionController.oneTimeAccountPayment);

    this.router
      .route(`${this.path}:userId/bank-account-transfer`)
      .post(transactionController.bankAccountTransfer);

    

    this.router
      .route(`${this.path}:userId/transaction-history`)
      .get(transactionController.userTransactionHistory);
  }
}

export const transanctionRoutes = new TransanctionRoutes();
