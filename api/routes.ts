import { Router } from "express";
import { usersRoutes } from "./components/users";

class Routes {
    /*
          Imports and sets up all the necessary routes classes for use in the application.
          The main purpose of this class is to provide a centralized location to manage
          the routing configuration for the application, making it easier  to add, modify, or remove routes as needed.
      */
    public router: Router;
  
    constructor() {
      this.router = Router();
      this.initializeRoutes();
    }
  
    private initializeRoutes() {
      this.router.use("/users", usersRoutes.router);
    }
  }

export const routes = new Routes()