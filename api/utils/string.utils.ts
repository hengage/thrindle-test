import crypto from "crypto";

import jwt from "jsonwebtoken";

import { DateTime } from "luxon";
import { JWT_SECRET_KEY } from "../config";

class StringUtils {
  private timestamp: Number;

  constructor() {
    this.timestamp = DateTime.now().toUnixInteger();
  }
  public generateUniqueString(length: number) {
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    const hexString = randomBytes.toString("hex").slice(0, length);
    const uniqueString = `${hexString}${this.timestamp
      .toString()
      .substring(6)}`;
    return uniqueString;
  }

  public generateJWT(payload: any, expiresIn: string): string {
    return jwt.sign(payload, `${JWT_SECRET_KEY}`, { expiresIn });
  }

  public generateTxRef(length: number): string {
    const randomBytes = crypto.randomBytes(11);
    const hexString = randomBytes.toString("hex").slice(0, length);
    const txRef = `${hexString}_${this.timestamp.toString().substring(4)}`
    
    return txRef;
  }
}

export const stringUtils = new StringUtils();
