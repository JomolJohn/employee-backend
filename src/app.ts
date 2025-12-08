// src/app.ts
import { config } from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import ExpressMongoSanitize from "express-mongo-sanitize";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { router as userRouter } from "./routes/user.routes";
import { notFoundMiddleware } from "./middleware/index.middleware";
import errorHandlerMiddleware from "./middleware/errorHandler.middleware";
import { corsOptions } from "./config/corsOptions";
import { errorHandler, successHandler } from "./config/morgan";

config();

export const bootstrapExpress = (app: any) => {
  app.use(successHandler);
  app.use(errorHandler);
  //app.use(ExpressMongoSanitize());
  app.use((req, res, next) => {
    if (req.body) {
      req.body = ExpressMongoSanitize.sanitize(req.body); // Sanitize req.body
    }
    if (req.params) {
      req.params = ExpressMongoSanitize.sanitize(req.params); // Sanitize req.params
    }
    // Skip req.query to avoid the immutability issue
    next();
  });
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(helmet.xssFilter());
  app.use(helmet.contentSecurityPolicy({
      directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'trusted-cdn.com'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
      },
  }));
  app.use(cors());
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
  app.use("/users", userRouter);
  // app.use((err: any, req: Request & { errorMessage?: string }, res: Response, next: NextFunction) => {
  //   req.errorMessage = err.message;
  //   next(err);
  // });
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
};