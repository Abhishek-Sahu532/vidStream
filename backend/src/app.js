import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import 'dotenv/config'
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

//routes imports
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";

//routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);

export { app };
