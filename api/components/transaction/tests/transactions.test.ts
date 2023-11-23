import mongoose from "mongoose";

import axios from "axios";

import { Transaction } from "../models/transaction.models";
import { MongoMemoryServer } from "mongodb-memory-server";
import { transactionService } from "../services/transaction.service";
// jest.mock(Transaction);

const mongoServer = new MongoMemoryServer();
let connectionString: string;

describe("Transaction", () => {
  let connectSpy: jest.SpyInstance<
    ReturnType<typeof mongoose.connect>,
    Parameters<typeof mongoose.connect>
  >;

  beforeAll(async () => {
    jest.setTimeout(100000);
    connectSpy = jest.spyOn(mongoose, "connect");
    await mongoServer.start();

    connectionString = await (mongoServer.getUri() as any);

    mongoose.set("strictQuery", false);
    await mongoose.connect(connectionString);
  });

  afterAll(async () => {
    connectSpy.mockRestore();
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test("test document saves to db", async () => {
    const transactionData = new Transaction({
      amount: 3000,
      user: "allison becker",
      senderEmail: "allisonbekcer@hotmail.com",
      reference: "tyt46ugbr",
      fee: 0,
    });
    console.log("Before save operation");
    await transactionData.save();
    console.log("After save operation");

    // Verify that the transaction was saved to the database
    const foundTransaction = await Transaction.findOne({
      reference: "tyt46ugbr",
    });
    expect(foundTransaction).toBeTruthy();
  });

  test("it calls axios.post 1 time", async () => {
    const mockData = {
      email: "test_email@email.com",
      firstName: "first-name",
      lastName: "last-name",
      phoneNumber: "phone-number",
      businessId: "test_business_id",
    };

    await transactionService.oneTimeAccountPayment(
      "henry@gmail.com",
      5000,
      "123"
    );
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
