import { Schema, model } from "mongoose";
import { IUser } from "../users.interface";
import { ACCOUNT_STATUS, encryption, stringUtils } from "../../../utils";

const userSchema = new Schema<IUser>(
  {
    _id: {
      type: String,
      unique: true,
      default: () => stringUtils.generateUniqueString(4),
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    bankVerificationNumber: { type: String, default: null },
    transactionPin: { type: String, default: null },
    accountStatus: { type: String, default: ACCOUNT_STATUS.ACTIVE },
  },
  { _id: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await encryption.encryptValue(this.password);
    } catch (error: any) {
      return next(error);
    }
  }

  if (this.isModified("transactionPin")) {
    try {
      this.transactionPin = await encryption.encryptValue(
        `${this.transactionPin}`
      );
    } catch (error: any) {
      return next(error);
    }
  }
});

export const User = model<IUser>("User", userSchema);
