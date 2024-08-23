import { Router } from "express";
import {
  changeCurrentPassword,
  forgetPassword,
  getCurrentUser,
  getRecommendations,
  getUserChannelProfile,
  getWatchHistory,
  loginUser,
  logoutUser,
  refAccessToken,
  registerUser,
  resetPassword,
  updateAccountDetails,
  updateCoverImage,
  // googleAuthCallback,
  updateUserAvatar,
  resetPasswordForLoggedUser,
  // googleAuth,
} from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
// import passport from "passport";

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

router.route("/c/:username").get(getUserChannelProfile);

router.route("/history").get(verifyJWT, getWatchHistory);

router.route("/forget-password").post(forgetPassword);

router.route("/forget-password/:token").put(resetPassword);
router.route("/reset-password").put(verifyJWT, resetPasswordForLoggedUser);

router.route("/video-recommentions").get(verifyJWT, getRecommendations);

// router.get("/auth/google", (req, res) => {
//   const authUrl = `${req.protocol}://${req.get("host")}/api/v1/users/auth/google/initiate`;
//   res.json({ authUrl });
// });

// router.get(
//   "/auth/google/initiate",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// router.get("/auth/status", (req, res) => {
//   console.log("Session:", req.session);
//   console.log("User:", req.user);
//   console.log("Is Authenticated:", req.isAuthenticated());

//   if (req.isAuthenticated()) {
//     res.json({ isAuthenticated: true, user: req.user });
//   } else {
//     res.json({ isAuthenticated: false });
//   }
// });

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "http://localhost:5173/login",
//   }),
//   (req, res) => {
//     res.send(`
//       <script>
//         window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', user: ${JSON.stringify(req.user)} }, 'http://localhost:5173');
//         window.close();
//       </script>
//     `);
//   }
// );

export default router;
