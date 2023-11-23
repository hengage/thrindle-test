import { Request, Response, NextFunction } from "express";
import joi from "joi";

import { HandleException, STATUS_CODES } from "../../../utils";
import { FLW_SECRET_HASH } from "../../../config";

class ValidateTransaction {
  private secretHash: string;
  constructor() {
    this.secretHash = `${FLW_SECRET_HASH}`;
  }

  public validateSignature = (req: Request, res: Response, next: NextFunction) =>{
    try {
      const signature = req.headers["verif-hash"];

      if (!signature || signature !== this.secretHash) {
        // This request isn't from Flutterwave; discard
        res.status(STATUS_CODES.UNAUTHORIZED).end();
      } else {
        next();
      }
    } catch (error: any) {
      console.log({ error: error.message });
      res.status(STATUS_CODES.SERVER_ERROR).end();
    }
  }

  public async  validateDynamicAccount  (payload: any) {
    const loginSchema = joi.object({
      amount: joi.number().required(),
    });

    const { error } = loginSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new HandleException(STATUS_CODES.BAD_REQUEST, error.message);
    }
    return;
  };
}

export const validateTransaction = new ValidateTransaction();
