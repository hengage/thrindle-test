import { Request, Response } from "express";

import { transactionService } from "../services/transaction.service";
import { STATUS_CODES } from "../../../utils";
import { usersService } from "../../users";
import { validateTransaction } from "../validators/transaction.validator";
import { Transaction } from "../models/transaction.models";
import { emitEvents } from "../../../services";

class TransactionController {
  public async bankAccountTransfer(req: Request, res: Response) {
    const userId = (req as any).user._id;

    try {
      const response = await transactionService.bankAccountTransfer(req.body);
      const { bank_code, account_number, amount, bank_name, reference, fee } =
        response.data;

      emitEvents("record-tranaction", {
        amount: amount,
        recipientAccountNumber: account_number,
        bankCode: bank_code,
        bankName: bank_name,
        reference: reference,
        type: "debit",
        user: userId,
        fee: fee,
      });
      
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
    // const { userId } = req.params;
    const userId = (req as any).user._id;
    try {
      validateTransaction.validateDynamicAccount(req.body);
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

  public async userTransactionHistory(req: Request, res: Response) {
    const searchQuery = req.query.filter as string;
    const userId = (req as any).user._id;
    try {
      const transactionHistory = await Transaction.getTransactionHistory(
        userId,
        searchQuery
      );
      res.status(STATUS_CODES.OK).json({
        message: "Transaction history",
        data: transactionHistory,
      });
    } catch (error: any) {
      res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
        message: "Error getting transaction history",
        error: error.message,
      });
    }
  }
}

export const transactionController = new TransactionController();
