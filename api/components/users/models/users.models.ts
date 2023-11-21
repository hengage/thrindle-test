import { Schema, model } from "mongoose";
import { IUser } from "../users.interface";
import { ACCOUNT_STATUS, stringUtils } from "../../../utils";

const userSchema = new Schema<IUser>(
  {
    _id: {
         type: String,
         unique: true,
        default: () => stringUtils.generateUniqueString(4) },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    bankVerificationNumber: {type: String, default: null},
    transactionPin: {type: String, default: null},
    accountStatus: { type: String, default: ACCOUNT_STATUS.ACTIVE},
  },
  { _id: false, timestamps: true }
);

export const User = model<IUser>("User", userSchema);
