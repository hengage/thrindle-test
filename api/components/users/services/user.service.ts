import { User } from "../models/users.models";
import { ICreateuser, IUser } from "../users.interface";

class UsersService {
    public async createUser(payload: ICreateuser): Promise<IUser> {
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
            console.error(error)
            return error
        }
    }
}
export const usersService = new UsersService()