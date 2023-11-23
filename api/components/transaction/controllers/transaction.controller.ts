import { Request, Response } from "express";

import { transactionService } from "../services/transaction.service";
import { STATUS_CODES } from "../../../utils";
import { usersService } from "../../users";
import { validateTransaction } from "../validators/transaction.validator";

class TransactionController {
  public async bankAccountTransfer(req: Request, res: Response) {
    // console.log({ body: req.body});
    
    try {
      const response = await transactionService.bankAccountTransfer(req.body);
      res.status(STATUS_CODES.OK).json({
        message: "Transfer initiated successfully",
        data: response,
      });
    } catch (error: any) {
      res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
        message: "Failed to initiate transfer",
        error: error.message,
      });
    }
  }

  public async oneTimeAccountPayment(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      validateTransaction.validateDynamicAccount(req.body)
      const user = await usersService.getUserById(userId, "email");

      const dynamicVirtualAccount =
        await transactionService.oneTimeAccountPayment(
          user.email,
          req.body.amount,
          user._id
        );
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

  public handleWebHookPayload = (req: Request, res: Response) => {
    try {
      const payload = req.body;
      console.log({ payload: JSON.stringify(payload) });
      res.status(200).end();
    } catch (error: any) {
      console.log({ error: error.message });
      res.status(500).end();
    }
  };
}

export const transactionController = new TransactionController();
