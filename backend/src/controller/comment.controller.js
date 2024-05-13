import { Comment } from "../models/comment.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const createComment = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Comment is required");
  }
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "VideoId not found");
  }
  const user = req.user._id;
  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const createdComment = await Comment.create({
    content,
    video: videoId,
    createdBy: user,
  });

  if (!createdComment) {
    throw new ApiError(500, "Something went wrong while creating the comment");
  }

//commnet created till now

  return res
    .status(201)
    .json(new ApiResponse(200), createdComment, "Comment created successfully");
});
