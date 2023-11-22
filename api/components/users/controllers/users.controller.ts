import { Request, Response } from "express";
import { usersService } from "../services/user.service";
import { STATUS_CODES, stringUtils } from "../../../utils";

class UsersController {
  public async signup(req: Request, res: Response) {
    try {
      const user = await usersService.signup(req.body);

      const jwtPayload = {
        _id: user._id,
        phoneNumber: user.phoneNumber
      }

      const accessToken = stringUtils.generateJWT(
        jwtPayload, '2h'
      )
      res.status(STATUS_CODES.CREATED).json({
        message: "User created successfully",
        data: {
          _id: user._id,
          accessToken
        },
      });
    } catch (error: any) {
      res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  }

  public async login(req: Request, res: Response) {
    const { phoneNumber, password } = req.body;
    try {
      const user = await usersService.login({ phoneNumber, password });
      
      const jwtPayload = {
        _id: user._id,
        phoneNumber: user.phoneNumber
      }

      const accessToken = stringUtils.generateJWT(
        jwtPayload, '2h'
      )

      res.status(STATUS_CODES.OK).json({
        message: "Login successful",
        data: {
          _id: user._id,
          accessToken
        },
      });
    } catch (error: any) {
      res.status(error.status || STATUS_CODES.SERVER_ERROR).json({
        message: "Login failed",
        error: error.message,
      });
    }
  }
}

export const usersController = new UsersController();
