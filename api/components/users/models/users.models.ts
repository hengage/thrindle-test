import { Schema, model } from "mongoose";
import { IUser } from "../users.interface";
import { stringUtils } from "../../../utils";

const userSchema = new Schema<IUser>(
  {
    _id: { type: String, default: () => stringUtils.generateUniqueString(4) },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { _id: false, timestamps: true }
);

export const User = model<IUser>("User", userSchema);
