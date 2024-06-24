import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../Pages/Signin";
import { Signup } from "../Pages/Signup";
import { VideoUpload } from "../Pages/VideoUpload";
import Root from "../Pages/Root";
import { Subscribers } from "../Pages/Subscribers";
import { History } from "../Pages/History";
import { UserProfile } from "../Pages/UserProfile";
import { ForgetNewPassword } from "../Components/ForgetNewPassword";
import { ForgetPassword } from "../Components/ForgetPassword";
import ProtectedRoutes from "../ProtectedRoutes";
import App from "../App";
import { CommingSoon } from "../Components/CommingSoon";
import { SubscribedChannelPage } from "../Pages/SubscribedChannel";
import { AboutUs } from "../Pages/AboutUs";
import { FaqPage } from "../Pages/FAQ";
import { LikedPage } from "../Pages/LikedPage";
import { ResetPassword } from "../Components/ResetPassword";
import { UpdateCoverImage } from "../Components/UpdateCoveImage";
import { UpdateAvatar } from "../Components/UpdateAvatar";
import { UpdateUserDetails } from "../Components/UpdateUserDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Root /> },
      { path: "search", element: <Root /> },
      { path: "signin", element: <Signin /> },
      { path: "signup", element: <Signup /> },
      {
        path: "upload-a-video",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <VideoUpload /> }],
      },
      {
        path: "user/history",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <History /> }],
      },
      {
        path: "subscriber/:username",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <Subscribers /> }],
      },
      {
        path: "subscribed-channel/:username",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <SubscribedChannelPage /> }],
      },
      { path: "channel/:username", element: <UserProfile /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "forget-password/:token", element: <ForgetNewPassword /> },
      {
        path: "reset-password",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <ResetPassword /> }],
      },
      {
        path: "update-cover-image",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <UpdateCoverImage /> }],
      },
      {
        path: "update-avatar",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <UpdateAvatar /> }],
      },
      {
        path: "update-userprofile",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <UpdateUserDetails /> }],
      },
      { path: "FAQ", element: <FaqPage /> },
      { path: "about-us", element: <AboutUs /> },
      {
        path: "playlists",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <CommingSoon /> }],
      },
      {
        path: "watch-later",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <CommingSoon /> }],
      },
      {
        path: "liked-videos",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <LikedPage /> }],
      },
      {
        path: "user/inbox",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <CommingSoon /> }],
      },
      {
        path: "help",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <CommingSoon /> }],
      },
      { path: "*", element: <CommingSoon /> },
    ],
  },
]);

export default router;