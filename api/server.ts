import dotenv from "dotenv";
dotenv.config();

import { app } from "./app/app";
import { NODE_ENV, PORT } from "./config";

app.listenToPort(PORT, NODE_ENV)