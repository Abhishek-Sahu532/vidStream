import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";
// import { Server } from "socket.io";
// import { createServer } from "http";
// import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants.js";
// import { v4 as uuid } from "uuid";
// import { getSockets } from "./utils/emitEvent.js";
// import { Message } from "./models/message.model.js";

// connecting database - receiving a promise

dotenv.config({
  path: "./env",
});

// const server = createServer(app);
// const io = new Server(server, {});

// export const userSoketIDs = new Map();

// io.use((socket, next) => {});

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   const user = {
//     _id: 123,
//     name: "abhishek",
//   };
//   userSoketIDs.set(user._id, socket.id); //current active ids

//   socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
//     const messageForRealTime = {
//       content: messages,
//       _id: uuid(),
//       sender: {
//         _id: user._id,
//         name: user.name,
//       },
//       chat: chatId,
//       createdAt: new Date().toISOString(),
//     };

//     const messageForDB = {
//       content: messageForRealTime,
//       sender: user._id,
//       chat: chatId,
//     };

//     const membersSocket = getSockets(members);
//     io.to(membersSocket).emit(NEW_MESSAGE, {
//       chatId,
//       message: messageForRealTime,
//     });
//     io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId });
//     // console.log(messageForRealTime);
//     try {
//       await Message.create(messageForDB);
//     } catch (error) {
//       console.log(error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     userSoketIDs.delete(user._id.toString());
//   });
// });



  connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!!", err);
  });