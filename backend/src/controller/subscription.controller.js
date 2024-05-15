import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";

//creating a subscriber
export const createASubscriber = asyncHandler(async (req, res) => {
  const subscriber = await User.findById(req.user._id);
  if (!subscriber) {
    throw new ApiError(400, "Subscriber not found");
  }

  //we will get the subscriber details from the logged user details
  const {channel} = req.params; //logged user
  if (!channel) {
    throw new ApiError(400, "Channel name is missing");
  }

// console.log(subscriber, channel)
  const createdSubscriber = await Subscription.create({
    subscriber : channel,
    channel : req.user._id
  });

  if (!createdSubscriber) {
    throw new ApiError(500, "Something went wrong while adding the subscriber");
  }
console.log(createdSubscriber)
  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Subscriber created successfully"));
});
  