import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import sendEmail from "../utils/SendEmail.js";
import crypto from "crypto";
import passport from "passport";
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.refreshAccessToken();
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    //to not touch the validation specially the password , just update the refresh token
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

function getPublicIdFromUrl(url) {
  const parts = url.split("/");
  const publicIdWithExtension = parts[parts.length - 1];
  const publicId = publicIdWithExtension.split(".")[0];
  return publicId;
}
//registering the user -- TESTED
export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, username, password } = req.body;

  //validation
  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath =
    req.files?.coverImage && req.files?.coverImage
      ? req.files?.coverImage[0]?.path
      : "";

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  //CLOUDINARY

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  const user = await User.create({
    fullname,
    email,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

//login user -- TESTED
export const loginUser = asyncHandler(async (req, res) => {
  //todos
  //getting details from user - email and password
  //check if the user exists in the database or not
  //if the user is registered in the app, compare the hashed password which stored in the database and receveind from the user
  //if any value is not matched with the stored value- throw an error
  // if the given values is correct- generate the accesstoken and refreshToken and share with the client in cookies

  const { username, email, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username or password is required");
  }
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }
  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //sending details in cookies
  const options = {
    httpOnly: true,
    secure: true,
  };
  //by default an user or client can change the cookies in the browser but when we modify the httpOnly and secure with the true value so only from server we can change the cookies.
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

//logout user -- TESTED
export const logoutUser = asyncHandler(async (req, res) => {
  //clear the cookies from the client and database
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true, //to getting the updated value
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

// REFRESH ACCESS TOKEN

export const refAccessToken = asyncHandler(async (req, res) => {
  //if user hitting the endpoint, we will catch through req.cookies or if user has mobile app so choose the second method
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refrsh token is used or expired");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", newRefreshToken)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({
    validateBeforeSave: false,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password change successfully"));
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  // console.log(req.user)
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfulyy"));
});

export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullname, email, username } = req.body;
  if (!fullname || !email || !username) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { fullname, email, username },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

//update user avatar
export const updateUserAvatar = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }
  //deleting the previous image
  const publicIdForAvatar = await getPublicIdFromUrl(user.avatar);
  await deleteFromCloudinary(publicIdForAvatar);

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  //uploading the new image
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar) {
    throw new ApiError(400, "Error while upload on avatar");
  }

  //updating the user object
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Avatar changed successfully"));
});

//update cover image
export const updateCoverImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  if (user.coverImage !== "") {
    const publicIdForCoverImage = await getPublicIdFromUrl(user.coverImage);
    await deleteFromCloudinary(publicIdForCoverImage);
  }

  const coverLocalPath = req.file?.path;
  // console.log('path', coverLocalPath)
  if (!coverLocalPath) {
    throw new ApiError(400, "Cover Image file is missing");
  }

  const coverImage = await uploadOnCloudinary(coverLocalPath);
  if (!coverImage) {
    throw new ApiError(400, "Error while upload on cover image");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Cover Image updated successfully"));
});

//my profile in client

export const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username.trim()) {
    throw new ApiError(400, "Username is missing");
  }

  try {
    let user = null;
    const token =
      req.cookies?.accessToken ||
      req.headers?.authorization?.replace("Bearer ", "");
    if (token) {
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );
      if (!user) {
        throw new ApiError(401, "Invalid Access Token");
      }
    }

    req.user = user;
    const channel = await User.aggregate([
      {
        $match: {
          username: username?.toLowerCase(),
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "channel",
          as: "subscribers", //my subscriber
        },
      },
      {
        $lookup: {
          from: "subscriptions",
          localField: "_id",
          foreignField: "subscriber",
          as: "subscribedTo", //subscriber of any user
        },
      },
      {
        $lookup: {
          from: "videos",
          localField: "_id",
          foreignField: "uploader",
          as: "videos", // videos uploaded by the user
        },
      },
      {
        $addFields: {
          subscribersCount: {
            $size: "$subscribers",
          },
          channelsSubscribedToCount: {
            $size: "$subscribedTo",
          },
          isSubscribedTo: {
            $cond: {
              if: {
                $and: [
                  { $isArray: "$subscribers.subscriber" },
                  { $in: [user?._id, "$subscribers.subscriber"] },
                ],
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $project: {
          fullname: 1,
          username: 1,
          subscribersCount: 1,
          channelsSubscribedToCount: 1,
          avatar: 1,
          coverImage: 1,
          email: 1,
          isSubscribedTo: 1,
          subscribers: 1,
          subscribedTo: 1,
          videos: {
            _id: 1,
            videoFile: 1,
            thumbnail: 1,
            title: 1,
            description: 1,
            duration: 1,
            views: 1,
            isPublished: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      },
    ]);

    if (!channel?.length) {
      throw new ApiError(404, "Channel does not exist");
    }
    // console.log( channel[0])
    return res
      .status(200)
      .json(
        new ApiResponse(200, channel[0], "User channel fetched successfully")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

//GET USER'S WATCH HISTORY
export const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    fullname: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "Watch history fetched successfully"
      )
    );
});

//forget password

export const forgetPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // console.log(req.body.email)
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  //get resetpassword token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  // const resetPasswordLink = `${process.env.FRONTEND_URL}/forget-password/${resetToken}`; //TEMP

  const resetPasswordLink = `${req.protocol}://${req.get("host")}/forget-password/${resetToken}`;

  const message = `Your password reset token is TEMP :- \n ${resetPasswordLink} \nIf you have not requested this email then please ignore it  `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Password Recovery For Youtube Project`,
      message,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, {}, `Email sent to ${user.email} successfully.`)
      );
  } catch (e) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    console.log(e);
    throw new ApiError(500, e);
  }
});

//reset password

export const resetPassword = asyncHandler(async (req, res) => {
  const resetPasswordTokenByUser = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordTokenByUser,
  });
  if (!user) {
    throw new ApiError(404, "Token is expired");
  }

  if (req.body.password !== req.body.confirmPassword) {
    throw new ApiError(404, "Password does not matched");
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, `Password changed successfully.`));
});

//reset password for logged user
export const resetPasswordForLoggedUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  const oldPassword = req.body.oldPassword;
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Old Password is incorrect");
  }
  if (req.body.oldPassword === req.body.newPassword) {
    throw new ApiError(404, "Old and New password must be diffrent");
  }
  if (req.body.newPassword !== req.body.confirmNewPassword) {
    throw new ApiError(404, "Password and Confirm Password does not match");
  }
  user.password = req.body.newPassword;
  await user.save();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, `Password changed successfully.`));
});

//update coverimage

//GOOGLE AUTH

export const googleAuth = asyncHandler(async (req, res) => {
  console.log('1111111111111111111')
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/users/auth/google/callback",
      },
      console.log('2222222'),
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create user in your database
          let user = await User.findOne({ username: profile.id });
          if (!user) {
            user = await User.create({
              username: profile.id,
              fullname: profile.displayName,
              email: profile.emails[0].value,
            });
          }
          console.log('user', user)
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );


// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});


// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
});

//get recommendations

import { Video } from "../models/video.model.js";
import { fetchUserData } from "../utils/fetchUserData.js";
import {
  computeTFIDF,
  getSimilarVideos,
} from "../utils/contentBasedFiltering.js";
import {
  getSimilarUsers,
  getRecommendedVideosFromUsers,
} from "../utils/collaborativeFiltering.js";
import { deleteFromCloudinary } from "../utils/deleteFromCloudinary.js";

export const getRecommendations = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  const { watchHistory, likedVideos } = await fetchUserData(userId);
  const allWatchedVideos = [...watchHistory, ...likedVideos];

  // Compute TF-IDF for all videos in the database
  const allVideos = await Video.find().exec();
  await computeTFIDF(allVideos);

  // Get content-based recommendations
  const contentBasedRecommendations = new Set();
  allWatchedVideos.forEach((video) => {
    const similarVideos = getSimilarVideos(video, allVideos);
    similarVideos.forEach((simVideo) =>
      contentBasedRecommendations.add(simVideo?._id.toString())
    );
  });

  // Get collaborative filtering recommendations
  const similarUsers = await getSimilarUsers(userId);
  const collaborativeRecommendations =
    await getRecommendedVideosFromUsers(similarUsers);

  // Combine recommendations
  const combinedRecommendations = Array.from(
    new Set([
      ...contentBasedRecommendations,
      ...collaborativeRecommendations.map((video) => video.toString()),
    ])
  );

  //  Fetch and return recommended video details

  const recommvideos = await Video.find({
    _id: { $in: combinedRecommendations },
  })
    .populate({
      path: "uploader",
      select: "fullname username avatar",
    })
    .exec();
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { recommvideos },
        `Video Recommendations successfully.`
      )
    );
});
