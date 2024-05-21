import mongoose, { Schema } from "mongoose";

const likeShema = new Schema(
  {
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likesCount: {
      type: Number,
      default : 0
    },
    dislikesCount: {
      type: Number,
      default : 0
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeShema);
