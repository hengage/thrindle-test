import { Server } from "http";
import express, { Express, Request, Response } from "express";

class App {
  public app: Express;

  constructor() {
    this.app = express();

    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  public initializeRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Thrindle test app");
    });
  }

  public listenToPort(port: string | number, node_env: string): Server {
    return this.app.listen(`${port}`, () => {
      console.log(`Server started at port ${port}. Current ENV is ${node_env}`);
    });
  }
}

export const app = new App();
