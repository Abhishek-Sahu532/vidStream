import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { Like } from "../models/like.model.js";

export const addVideoLike = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const videoId = req.params.videoId;
  if (!videoId) {
    throw new ApiError(400, "Video Id not found");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(400, "Video not found");
  }

  const isAlreadyLiked = await Like.findOne({
    video: req.params.videoId,
    like: user._id,
  });
  if (isAlreadyLiked) {
    throw new ApiError(400, "Already Liked");
  }

  const like = await Like.create({
    video: videoId,
    like: user._id,
  });
  if (!like) {
    throw new ApiError(500, "Something went wrong while adding a like");
  }
  console.log(like);
  return res
    .status(201)
    .json(new ApiResponse(200), {}, "like added successfully");
});

export const addVideoDislik = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const videoId = req.params.videoId;
  if (!videoId) {
    throw new ApiError(400, "Video Id not found");
  }

  const isAlreadyDisliked = await Like.findOne({
    video: req.params.videoId,
    dislike: user._id,
  });
  if (isAlreadyDisliked) {
    throw new ApiError(400, "Already disliked");
  }
  const dislike = await Like.create({
    video: videoId,
    dislike: user._id,
  });
  if (!dislike) {
    throw new ApiError(500, "Something went wrong while adding a dislike");
  }
  console.log(dislike);
  return res
    .status(201)
    .json(new ApiResponse(200), {}, "dislike added successfully");
});
