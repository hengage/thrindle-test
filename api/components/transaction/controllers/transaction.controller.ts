import { Request, Response } from "express";
import { transactionService } from "../services/transaction.service";
import { STATUS_CODES } from "../../../utils";

class TransactionController {
  public async oneTimeAccountPayment(req: Request, res: Response) {
    const { email, amount } = req.body;
    try {
      const dynamicVirtualAccount =
        await transactionService.oneTimeAccountPayment(email, amount);
      res.status(STATUS_CODES.CREATED).json({
        message: "Account created",
        data: dynamicVirtualAccount,
      });
    } catch (error: any) {
      res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
        message: "Failed to create account",
        error: error.message,
      });
    }
  }
}

export const transactionController = new TransactionController();
