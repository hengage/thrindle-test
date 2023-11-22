import axios from "axios";

import { FLW_SECRET_KEY } from "../../../config";
import { HandleException, STATUS_CODES, stringUtils } from "../../../utils";
import { Transaction } from "../models/transaction.models";

const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY
);

class TransactionService {
  private transactionRef: Function;
  constructor() {
    this.transactionRef = () => stringUtils.generateTxRef(14);
  }

  public async recordTransaction(payload: any) {
    try {
      const transaction = new Transaction({
        amount: payload.amount,
        user: payload.user,
        senderEmail: payload.senderEmail,
        reference: payload.reference,
        fee: payload.fee,
      });

      await transaction.save();
    } catch (error: any) {
      throw new HandleException(error.status, error.message);
    }
  }

  public async bankAccountTransfer(payload: any) {
    const {
      amount,
      bankCode,
      recipientAccountNumber,
      recipientName,
      narration,
    } = payload;

    const details = {
      account_bank: bankCode,
      account_number: recipientAccountNumber,
      amount,
      currency: "NGN",
      // recipient: recipientName,
      narration,
    };
    try {
      const response = await flw.Transfer.initiate(details);

      if (response.status === "success") {
        return response;
      }
      throw new HandleException(STATUS_CODES.BAD_REQUEST, response.message);
    } catch (error: any) {
      throw new HandleException(error.status, error.message);
    }
  }

  public async oneTimeAccountPayment(email: string, amount: number, userId: string) {
    // Creates a dynamic account number which would expire after payment
    // has been confirmed or the period of time indicated.
    const tx_ref = this.transactionRef();
    try {
      const response = await axios.post(
        "https://api.flutterwave.com/v3/virtual-account-numbers",
        {
          email,
          amount,
          tx_ref,
          is_permanent: false,
          expires: 300,
          frequency: 3,
        },
        {
          headers: {
            Authorization: `Bearer ${FLW_SECRET_KEY}`,
          },
        }
      );

      const virtualAccount = response.data.data;
      this.recordTransaction({
        amount,
        senderEmail: email,
        reference: tx_ref,
        user: userId,
      });
      return virtualAccount;
    } catch (error: any) {
      throw new HandleException(error.status, error.response.data.message);
    }
  }
}

export const transactionService = new TransactionService();
