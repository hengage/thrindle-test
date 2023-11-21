import { Server } from "http";
import express, { Express, Request, Response } from "express";
import { dbConfig } from "../config";
import { centralErrorHandler } from "../middleware";

class App {
  public app: Express;

  constructor() {
    this.app = express();

    this.connectToDB();
    this.initializeMiddleware();
    this.initializeRoutes();
    this.handleErrorsCentally()
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private connectToDB = async () => {
    try {
      await dbConfig.connect();
      console.log("conected to db");
    } catch (error) {
      console.error(error);
    }
  };

  public initializeRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Thrindle test app");
    });
  }

  private handleErrorsCentally() {
    this.app.use(
        centralErrorHandler.handle404Error,
        centralErrorHandler.handle404OrServerError
      );
  }

  public listenToPort(port: string | number, node_env: string): Server {
    return this.app.listen(`${port}`, () => {
      console.log(`Server started at port ${port}. Current ENV is ${node_env}`);
    });
  }
}

export const app = new App();
