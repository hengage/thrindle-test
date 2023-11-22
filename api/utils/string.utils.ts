import crypto from "crypto";

import jwt from "jsonwebtoken";

import { DateTime } from "luxon";
import { JWT_SECRET_KEY } from "../config";

class StringUtils {
  public generateUniqueString(length: number) {
    const randomBytes = crypto.randomBytes(Math.ceil(length / 2));
    const hexString = randomBytes.toString("hex").slice(0, length);
    const timestamp = DateTime.now().toUnixInteger().toString().substring(6);
    const uniqueString = `${hexString}${timestamp}`;
    return uniqueString;
  }

  public generateJWT(payload: any, expiresIn: string): string {
    return jwt.sign(payload, `${JWT_SECRET_KEY}`, { expiresIn });
  }
}
export const stringUtils = new StringUtils();
