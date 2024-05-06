import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  // const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
  const videos = await Video.find({});

  if (!videos) {
    return new ApiError(400, "Videos not fetched");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Video fetched successfully"));
});

// UPLOAD A VIDEO

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  // TODO: get video, upload to cloudinary, create video
  if (!title || !description) {
    return new ApiError(400, "Please fill the require details");
  }

  const videoLocalPath = req.files?.videoFile[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!videoLocalPath) {
    return new ApiError(400, "Video file is required");
  }
  if (!thumbnailLocalPath) {
    return new ApiError(400, "Thubmnail file is required");
  }

  const videoOnCloudinary = await uploadOnCloudinary(videoLocalPath);
  const ThubmnailOnCloudinary = await uploadOnCloudinary(thumbnailLocalPath);

  if (!videoOnCloudinary) {
    return new ApiError(400, "Video file is required");
  }

  if (!ThubmnailOnCloudinary) {
    return new ApiError(400, "Thubmnail file is required");
  }
  console.log(videoOnCloudinary);
  const video = await Video.create({
    title,
    description,
    videoFile: videoOnCloudinary.url,
    thumbnail: ThubmnailOnCloudinary.url,
    duration: videoOnCloudinary.duration,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded successfully"));
});

// GET VIDEO BY VIDEO ID
const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  console.log(videoId);
  if (!videoId) {
    new ApiError(404, "Id is not valid");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }
  //INCREMENTING THE VIDEO COUN
  video.views += 1;
  video.save();
  // (err) => {
  //   if (err) {
  //     return res.status(500).json({ message: "Error incrementing view count" });
  //   }
  // }
  console.log(video);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        video,
        "Video fetched & incrementing the view count successfully"
      )
    );
});

//UPDATE THE VIDEO BY VIDEO ID
const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

//DELETE THE VIDEO BY VIDEO ID
const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

//PUBLISH STATUS
const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
