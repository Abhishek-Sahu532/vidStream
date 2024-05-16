import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //my subscriber, which i subscribed
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, //subscriber of any user
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
