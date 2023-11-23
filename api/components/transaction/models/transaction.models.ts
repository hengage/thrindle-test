import { Schema, model } from "mongoose";
import { ITransaction, TransactionMethods } from "../transactions.interface";
import { stringUtils } from "../../../utils";

const transactionSchema = new Schema<ITransaction>(
  {
    _id: { type: String, default: () => stringUtils.generateUniqueString(4) },
    user: { type: String, required: true },
    senderEmail: { type: String, required: true },
    amount: { type: Number, required: true },
    reference: { type: String, default: "" },
    fee: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

transactionSchema.statics.getTransactionHistory = async function (
  userId: string
): Promise<ITransaction[]> {
  const result = await this.aggregate([
    { $match: { user: userId } },
    { $sort: { createdAt: -1 } },
    {
      $project: {
        _id: 0,
        senderEmail: "$senderEmail",
        amount: "$amount",
        reference: "$reference",
        date: "$createdAt",
        fee: "$fee"
      },
    },
  ]).exec();

  return result;
};

export const Transaction = model<ITransaction, TransactionMethods>(
  "Transaction",
  transactionSchema
);
