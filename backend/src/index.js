import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

// connecting database - receiving a promise

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!!", err);
  });

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
