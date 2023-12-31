import { Document } from 'mongoose';

export interface IUser extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    email: string;
    bankVerificationNumber: string | null;
    transactionPin: string | null;
    accountStatus: string;
  }

  export interface ICreateuser {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
  }

  export interface ILoginUser {
    phoneNumber: string;
    password: string;
  }