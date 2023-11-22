import { Schema, model } from "mongoose";
import { ITransaction } from "../transactions.interface";
import { stringUtils } from "../../../utils";

const transactionSchema = new Schema<ITransaction>(
  {
    _id: { type: String, default: () => stringUtils.generateUniqueString(4) },
    user: { type: String, required: true },
    senderEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    reference: { type: String, default: ''},
    fee: { type: Number, default: null}
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema)