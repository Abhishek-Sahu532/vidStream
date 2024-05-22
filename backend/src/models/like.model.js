import mongoose, { Schema } from "mongoose";

const likeShema = new Schema(
  {
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    like: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    dislike: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },


  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeShema);
