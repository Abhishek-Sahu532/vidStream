import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import "./middlewares/google.auth.middleware.js";

const app = express();
console.log(process.env.CORS_ORIGIN);
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.CORS_ORIGIN
        : ["http://localhost:5173", "http://localhost:8000"],

    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://vid-stream-client.vercel.app");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Express session
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Your MongoDB connection string
      collectionName: "sessions", // Optional: Collection name for storing sessions
    }),
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

//routes imports
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import subscribeRouter from "./routes/subscription.routes.js";
import likeRouter from "./routes/like.routes.js";
import chatRouter from "./routes/chat.routes.js";
import { generateAccessAndRefreshToken } from "./controller/user.controller.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/subscriber", subscribeRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/chat", chatRouter);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route after Google OAuth
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.redirect("/login"); // Handle if user is not authenticated
      }

      // Generate tokens asynchronously
      const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
        user._id
      );

      const options = {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "none",
      };

      // Set cookies with the generated tokens
      res.cookie("accessToken", accessToken, options);
      res.cookie("refreshToken", refreshToken, options);
      console.log("user from password block", user);
      // Redirect to frontend after successful login
      const redirectUrl =
        process.env.NODE_ENV === "production"
          ? "https://vid-stream-client.vercel.app/"
          : "http://localhost:5173/";
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("Error in Google authentication callback:", error);
      res.redirect("/login"); // Redirect to login in case of an error
    }
  }
);

export { app };
