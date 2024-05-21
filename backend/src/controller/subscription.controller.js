import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import { mongoose } from "mongoose";

//creating a subscriber
export const createASubscriber = asyncHandler(async (req, res) => {
  const subscriber = await User.findById(req.user._id);
  // Retrieve the subscriber (the current user)
  if (!subscriber) {
    throw new ApiError(400, "Subscriber not found");
  }
  //channel details, i am sending objectid instead of params
  // Extract channel from request parameters
  const { channel } = req.params;
  //   console.log("channel", channel)
  if (!channel) {
    throw new ApiError(400, "Channel name is missing");
  }

  // Check if the user is trying to subscribe to themselves
  if (req.user._id.toString() === channel) {
    throw new ApiError(400, "You can't subscribe to yourself");
  }

  // Check if the subscription already exists
  const existingSubscription = await Subscription.findOne({
    subscriber: req.user._id,
    channel,
  });
  if (existingSubscription) {
    throw new ApiError(400, "You are already subscribed to this channel");
  }

  //IF NOT, CREATE THE SUBSCRIBER
  const createdSubscriber = await Subscription.create({
    subscriber: req.user._id,
    channel,
  });

  if (!createdSubscriber) {
    throw new ApiError(500, "Something went wrong while adding the subscriber");
  }
  //   console.log(createdSubscriber);
  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Subscribed successfully"));
});

//UNSUBSCRIBER
export const deleteASubscriber = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "user not found");
  }

  // console.log('logged user', user)
  const { channel } = req.params;
  // const channelId = mongoose.Types.ObjectId(channel);
  // console.log(channel, channelId)
  if (!channel) {
    throw new ApiError(400, "Channel details is missing");
  }

  const deletedChannel = await Subscription.findOneAndDelete({
    subscriber: user._id,
    channel: channel,
  });

  if (!deletedChannel) {
    throw new ApiError(
      500,
      "Something went wrong while deleteing the subscriber"
    );
  }
  // console.log(deletedChannel);
  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Unsubscribed successfully"));
});

// controller to return subscriber list of a channel
export const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const subscribers = await Subscription.aggregate([
    {
      $match: {
        channel: req.user._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriberDetails",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "subscriberDetails._id",
        foreignField: "subscriber",
        as: "subscriberSubscriptions",
      },
    },
    {
      $match: {
        "subscriberSubscriptions.subscriber": { $ne: req.user._id },
      },
    },
    {
      $project: {
        _id: 0,
        subscriberId: "$subscriberDetails._id",
        username: "$subscriberDetails.username",
        fullname: "$subscriberDetails.fullname",
        avatar: "$subscriberDetails.avatar",
        subscriberSubscriptionsCount: { $size: "$subscriberSubscriptions" },
      }, //watch it - for subscriberSubscriptionsCount value, might getting wrong
    },
    {
      $group: {
        _id: null,
        subscribers: { $push: "$$ROOT" },
        totalSubscribers: { $sum: 1 },
      },
    },
    {
      $addFields: {
        subscribers: "$subscribers",
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers[0], "subscribers fetched successfully")
    );
});

// controller to return channel list to which user has subscribed
export const getSubscribedChannels = asyncHandler(async (req, res) => {
  // console.log('1111111111111111111')

  const subscribedChannels = await Subscription.aggregate([
    {
      $match: {
        subscriber: req.user._id,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "channelDetails",
      },
    },
    {
      $unwind: "$channelDetails",
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "channelDetails._id",
        foreignField: "channel",
        as: "channelSubscribers",
      },
    },
    {
      $project: {
        _id: 0,
        channelId: "$channelDetails._id",
        username: "$channelDetails.username",
        fullname: "$channelDetails.fullname",
        avatar: "$channelDetails.avatar",
        subscribersCount: { $size: "$channelSubscribers" },
      },
    },
    {
      $group: {
        _id: null,
        channels: {
          $push: "$$ROOT",
        },
        totalChannels: {
          $sum: 1,
        },
      },
    },
    {
      $addFields: {
        channels: "$channels",
      },
    },
  ]);

  // console.log(subscribedChannels)

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedChannels[0],
        "subscribedChannels fetched successfully"
      )
    );
});
