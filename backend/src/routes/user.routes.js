import { Router } from "express";
import {
  changeCurrentPassword,
  forgetPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refAccessToken,
  registerUser,
  resetPassword,
  updateAccountDetails,
  updateCoverImage,
  updateUserAvatar,
} from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").get(verifyJWT, logoutUser);

router.route("/refresh-token").post(refAccessToken);

router.route("/change-password").post(verifyJWT, changeCurrentPassword);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router
  .route("/cover-image")
  .patch(verifyJWT, upload.single("coverImage"), updateCoverImage);

router.route("/c/:username").get( getUserChannelProfile);

router.route("/history").get(verifyJWT, getWatchHistory);


router.route('/forget-password').post(forgetPassword)

router.route('/forget-password/:token').put(resetPassword)

export default router;