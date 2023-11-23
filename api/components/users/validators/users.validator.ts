import joi from "joi";
import { HandleException, STATUS_CODES } from "../../../utils";

class ValidateUsers {
  public async validateSignUp (payload: any) {
    const signUpSchema = joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      phoneNumber: joi.string().required(),
      email: joi.string().required(),
      password: joi.string().required(),
    });

    const { error } = signUpSchema.validate(payload, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new HandleException(STATUS_CODES.BAD_REQUEST, error.message);
    }
    return;
  };

  public async validateLogin (payload: any) {
    const loginSchema = joi.object({
      phoneNumber: joi.string().required(),
      password: joi.string().required(),
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

export const validateUsers = new ValidateUsers();