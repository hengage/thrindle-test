import { HandleException } from "../../../utils";
import { User } from "../models/users.models";
import { ICreateuser, IUser } from "../users.interface";

class UsersService {
    public async signup(payload: ICreateuser): Promise<IUser> {
        try {
            const user = new User({
                firstName: payload.firstName,
                lastName: payload.lastName,
                phoneNumber: payload.phoneNumber,
                password: payload.password,
            })

            const newUser = await user.save()
            return newUser
        } catch (error: any) {
            throw new HandleException(error.status, error.message)
        }
    }
}
export const usersService = new UsersService()