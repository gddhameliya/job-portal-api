//* This is used so that you don't have to use try catch in every controller
//* It will catch all the errors and pass it to the error handler middleware
import "express-async-errors";

import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import { createServer } from "http";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import config from "./config/env.config";
import routes from "./routes";
import errorHandler from "./middlewares/error.handler";
import logger  from "./common/utils/logger";
import db from "./model/index"

const app: Application = express();
const server = createServer(app);
const { port } = config;

//* External  Middleware
app.use(express.static(path.resolve("./public")));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


//* API logger
app.use(morgan("dev"));

//* API routes
app.use("/api/v1", routes);

//* Error Handling
app.use(errorHandler);

//* Port listen and DB connection
server.listen(port, async () => {
  logger.debug(`Server running on http://localhost:${port}`);
  db.sequelize
    .authenticate()
    .then(() => {
      logger.verbose("Connection has been established successfully.");
    })
    .catch((err: any) => {
      logger.warn(`Unable to connect to the database: ${err}`);
    });
});

export default app;
