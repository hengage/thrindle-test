import { Document } from "mongoose"

export interface ITransaction extends Document {
    _id: string,
    amount: number,
    txRef: string
    type: 'credit' | 'debit';
    user: string;
    senderEmail: string;
    reference: string;
    fee: Number
    createdAt: string
}