import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";

const app = express();
dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  })
);
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public/temp")));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js";
import contactRouter from "./routes/contact.routes.js";
import applicationRouter from "./routes/application.routes.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/application", applicationRouter);

export { app };
