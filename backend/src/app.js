import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
const app = express();
import path from 'path'


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


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
import commentRouter from "./routes/comment.routes.js";
import subscribeRouter from "./routes/subscription.routes.js";
import likeRouter from './routes/like.routes.js'

//routes declaration

app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/subscriber", subscribeRouter);
app.use("/api/v1/like", likeRouter);



app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
})

export { app };
