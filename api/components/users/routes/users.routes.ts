import { Router } from "express";
import { usersController } from "../controllers/users.controller";

class UsersRoutes {
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`/signup`, usersController.signup);
    this.router.post(`/login`, usersController.login);

  }
}

export const usersRoutes = new UsersRoutes();
