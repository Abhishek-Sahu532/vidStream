import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    content: String,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attachements: [
      {
        type: String, //cloudinary url
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
