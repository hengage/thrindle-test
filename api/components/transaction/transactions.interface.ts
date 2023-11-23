import { Document, Model } from "mongoose";

export interface ITransaction extends Document {
  _id: string;
  amount: number;
  type: "credit" | "debit";
  user: string;
  senderEmail: string;
  reference: string;
  fee: Number;
  createdAt: string;
}

export interface TransactionMethods extends Model<ITransaction> {
  getTransactionHistory(userId: string, searchQuery?: string): Promise<ITransaction>; // Change the balance field type to Big
}
