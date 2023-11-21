import { Request, Response } from "express";
import { usersService } from "../services/user.service";

class UsersController{
    public async createUser (req: Request, res: Response){
        try {
            const user = await usersService.createUser(req.body)
            res.status(200).json({
                message: "User created successfully",
                data: {
                    _id: user._id
                }
            })
        } catch (error: any) {
            res.status(error.status || 500).json({
                message: "Error creating user",
                error: error.message
            })
        }
    }
}

export const usersController = new UsersController;