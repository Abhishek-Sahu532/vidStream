import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/subscription.model.js";
import { User } from "../models/user.model.js";
import { mongoose } from "mongoose";

//creating a subscriber
export const createASubscriber = asyncHandler(async (req, res) => {
  const subscriber = await User.findById(req.user._id);
  if (!subscriber) {
    throw new ApiError(400, "Subscriber not found");
  }
  //channel details, i am sending objectid instead of params
  const { channel } = req.params;
  //   console.log("channel", channel)
  if (!channel) {
    throw new ApiError(400, "Channel name is missing");
  }

  //watch it
  // if(Subscription.findById(channel)){
  //   throw new ApiError(400, "Channel already subscribed");
  // }
  // console.log(subscriber, channel)
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
		// {
		//   $unwind: "$subscriberDetails",
		// },
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
        "subscriberSubscriptions.subscriber": { $ne: req.user._id }
      }
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
	  

    
	//   const { subscribers, totalSubscribers } = subscribers[0];
  // console.log(subscribers[0])
  return res
    .status(200)
    .json(
      new ApiResponse(200, subscribers[0], "subscribers fetched successfully")
    );
});








// controller to return channel list to which user has subscribed
export const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;

  // const subscribedChannels = await Subscription.aggregate([
  //   {
  //     $match: {
  //       subscriber: new mongoose.Types.ObjectId(subscriberId),
  //     },
  //   },
  //   {
  //     $lookup: {
  //       from: "users",
  //       localField: "channel",
  //       foreignField: "_id",
  //       as: "subscribedChannel",
  //       pipeline: [
  //         {
  //           $lookup: {
  //             from: "videos",
  //             localField: "_id",
  //             foreignField: "owner",
  //             as: "videos",
  //           },
  //         },
  //         {
  //           $addFields: {
  //             latestVideo: {
  //               $last: "$videos",
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   },
  //   {
  //     $unwind: "$subscribedChannel",
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       subscribedChannel: {
  //         _id: 1,
  //         username: 1,
  //         fullname: 1,
  //         avatar: 1,
  //         // latestVideo: {
  //         // 	_id: 1,
  //         // 	'videoFile': 1,
  //         // 	'thumbnail': 1,
  //         // 	owner: 1,
  //         // 	title: 1,
  //         // 	description: 1,
  //         // 	duration: 1,
  //         // 	createdAt: 1,
  //         // },
  //       },
  //     },
  //   },
  // ]);


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
		// {
		//   $unwind: "$subscriberDetails",
		// },
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
        "subscriberSubscriptions.subscriber": { $ne: req.user._id }
      }
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
      new ApiResponse(
        200,
        subscribedChannels,
        "subscribed channels fetched successfully"
      )
    );
});
