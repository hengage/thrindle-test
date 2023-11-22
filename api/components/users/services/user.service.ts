import { HandleException, STATUS_CODES } from "../../../utils";
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
            })

            const newUser = await user.save()
            return newUser
        } catch (error: any) {
            throw new HandleException(error.status, error.message)
        }
    }

    public async login (payload: ILoginUser): Promise<IUser> {
        try {
            const user = await User.findOne({phoneNumber: payload.phoneNumber})
            .select('phoneNumber password')
            .lean()

            if ( !user ) {
                throw new HandleException(STATUS_CODES.NOT_FOUND, 'User not found')
            }
            return user
        } catch (error: any) {
            throw new HandleException(error.status, error.message)
        }
    }
}
export const usersService = new UsersService()