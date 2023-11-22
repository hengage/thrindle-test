import axios from "axios";

import { FLW_PUBLIC_KEY, FLW_SECRET_KEY } from "../../../config";
import { HandleException, stringUtils } from "../../../utils";

class TransactionService {

  public async oneTimeAccountPayment(email: string, amount: number) {
    // Creates a dynamic account number which would expire after payment
    // has been confirmed or the period of time indicated.

    const response = await axios.post(
      "https://api.flutterwave.com/v3/virtual-account-numbers",
      {
        email,
        amount,
        tx_ref: stringUtils.generateTxRef,
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
    return virtualAccount;
  }
  catch(error: any) {
    throw new HandleException(error.status, error.response.data.message);
  }
}

export const transactionService = new TransactionService();
