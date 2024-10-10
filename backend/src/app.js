import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import session from "express-session";
import MongoStore from "connect-mongo";


const app = express();



app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173", "http://localhost:8000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());




app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Express session
// app.use(
//   session({
//     secret: process.env.ACCESS_TOKEN_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: process.env.NODE_ENV === "production", // use secure cookies in production
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     },
//   })
// );

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
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);



// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
// // Serialize user for the session
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// // Deserialize user from the session
// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

//routes imports
import userRouter from "./routes/user.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import subscribeRouter from "./routes/subscription.routes.js";
import likeRouter from "./routes/like.routes.js";
import chatRouter from "./routes/chat.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/comment", commentRouter);
app.use("/api/v1/subscriber", subscribeRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/chat", chatRouter);

export { app };
