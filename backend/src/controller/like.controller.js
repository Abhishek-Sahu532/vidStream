import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Like } from "../models/like.model.js";


export const toggleVideoLikeDislike = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const videoId = req.params.videoId;
  console.log('videoId', req.body.action)
  if (!videoId) {
    throw new ApiError(400, "Video Id not found");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(400, "Video not found");
  }
  const existingLikeDislike = await Like.findOne({
    video: videoId,
    $or: [{ like: user._id }, { dislike: user._id }],
  });
  console.log('existingLikeDislike', existingLikeDislike)
  if (existingLikeDislike) {
    // User has already interacted with the video (either liked or disliked)
    if (existingLikeDislike.like) {
      // User has already liked the video
      if (req.body.action === "like") {
        throw new ApiError(400, "Already liked");
      } else {
        // User wants to dislike the video, so remove the existing like and add a dislike
        existingLikeDislike.like = null;
        existingLikeDislike.dislike = user._id;
        await existingLikeDislike.save();
        return res
          .status(200)
          .json(new ApiResponse(200), {}, "Dislike added successfully");
      }
    } else {
      // User has already disliked the video
      if (req.body.action === "dislike") {
        throw new ApiError(400, "Already disliked");
      } else {
        // User wants to like the video, so remove the existing dislike and add a like
        existingLikeDislike.dislike = null;
        existingLikeDislike.like = user._id;
        await existingLikeDislike.save();
        return res
          .status(200)
          .json(new ApiResponse(200), {}, "Like added successfully");
      }
    }
  } else {
    // User has not interacted with the video before
    const action = req.body.action;
    if (action === "like") {
      const like = await Like.create({ video: videoId, like: user._id });
      if (!like) {
        throw new ApiError(500, "Something went wrong while adding a like");
      }
      return res
        .status(201)
        .json(new ApiResponse(200), {}, "Like added successfully");
    } else if (action === "dislike") {
      const dislike = await Like.create({ video: videoId, dislike: user._id });
      if (!dislike) {
        throw new ApiError(500, "Something went wrong while adding a dislike");
      }
      return res
        .status(201)
        .json(new ApiResponse(200), {}, "Dislike added successfully");
    } else {
      throw new ApiError(400, "Invalid action");
    }
  }
});

//GET LIKE VIDEOS
export const getUsersLikedVideo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  console.log('userId', userId);

  const likedVideos = await User.aggregate([
    {
      $match: {
        _id: userId,
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "like",
        as: "likedVideos",
      },
    },
    {
      $unwind: "$likedVideos",
    },
    {
      $lookup: {
        from: "videos",
        localField: "likedVideos.video",
        foreignField: "_id",
        as: "videoDetails",
      },
    },
    {
      $unwind: "$videoDetails",
    },
    {
      $lookup: {
        from: "users",
        localField: "videoDetails.uploader",
        foreignField: "_id",
        as: "uploaderData",
      },
    },
    {
      $unwind: "$uploaderData",
    },
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        fullname: 1,
        about: 1,
        avatar: 1,
        coverImage: 1,
        "videoDetails._id": 1,
        "videoDetails.videoFile": 1,
        "videoDetails.thumbnail": 1,
        "videoDetails.title": 1,
        "videoDetails.description": 1,
        "videoDetails.duration": 1,
        "videoDetails.views": 1,
        "videoDetails.isPublished": 1,
        "uploaderData.username": 1,
        "uploaderData.fullname": 1,
        "uploaderData.avatar": 1,
      },
    },
  ]);

  // console.log('likedVideos', likedVideos)

  if (!likedVideos || likedVideos.length === 0) {
    throw new ApiError(404, "User has not liked any videos");
  }

  return res.status(200).json(new ApiResponse(200, likedVideos, "Liked videos fetched successfully"));
});
