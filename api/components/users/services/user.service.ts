import { HandleException, STATUS_CODES, encryption } from "../../../utils";
import { User } from "../models/users.models";
import { ICreateuser, ILoginUser, IUser } from "../users.interface";

class UsersService {
  public async signup(payload: ICreateuser): Promise<IUser> {
    try {
      const user = new User({
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        email: payload.email,
        password: payload.password,
      });

      const newUser = await user.save();
      return newUser;
    } catch (error: any) {
      throw new HandleException(error.status, error.message);
    }
  }

  public async login(payload: ILoginUser): Promise<IUser> {
    try {
      const user = await this.getUserByPhoneNumber(
        payload.phoneNumber,
        "phoneNumber password"
      );

      if (!user) {
        throw new HandleException(STATUS_CODES.NOT_FOUND, "User not found");
      }
      const passwordsMatch = await encryption.compareValues(
        payload.password,
        user.password
      );

      if (!passwordsMatch) {
        throw new HandleException(
          STATUS_CODES.UNAUTHORIZED,
          "Incorrect password"
        );
      }
      return user;
    } catch (error: any) {
      throw new HandleException(error.status, error.message);
    }
  }

  public async getUserByPhoneNumber(
    phoneNumber: string,
    selectFields?: string
  ): Promise<IUser> {
    try {
      const query = User.findOne({ phoneNumber: { $eq: phoneNumber } });

      if (selectFields) {
        query.select(selectFields);
      }
      const user = await query.lean().exec();

      if (!user) {
        throw new HandleException(STATUS_CODES.NOT_FOUND, "User not found");
      }

      return user;
    } catch (error: any) {
      throw new HandleException(error.status, error.message);
    }
  }

  public async getUserById(
    userId: string,
    selectFields?: string
  ): Promise<IUser> {
    try {
      const query = User.findById(userId);

      if (selectFields) {
        query.select(selectFields);
      }
      const user = await query.lean().exec();

      if (!user) {
        throw new HandleException(STATUS_CODES.NOT_FOUND, "User not found");
      }

      return user;
    } catch (error: any) {
      throw new HandleException(error.status, error.message);
    }
  }

  public checkPhoneNumberIsTaken = async (phoneNumber: string) => {
    try {
      const user = await User.findOne({ phoneNumber })
        .select("phoneNumber")
        .lean();
      if (user) {
        throw new HandleException(
          STATUS_CODES.CONFLICT,
          "Phone number is already in use"
        );
      }
      return;
    } catch (error: any) {
      throw new HandleException(error.status, error.message);
    }
  };

  public checkEmailIsTaken = async (email: string) => {
    try {
      const user = await User.findOne({ email })
        .select("email")
        .lean();
      if (user) {
        throw new HandleException(
          STATUS_CODES.CONFLICT,
          "Email is already in use"
        );
      }
      return;
    } catch (error: any) {
      throw new HandleException(error.status, error.message);
    }
  };
}
export const usersService = new UsersService();
