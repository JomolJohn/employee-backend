// src/app.ts
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { router as userRouter } from "./routes/user.routes";
import { notFound, errorHandler } from "./middleware/index.middleware";

config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);

app.use(notFound);
app.use(errorHandler);

export default app;