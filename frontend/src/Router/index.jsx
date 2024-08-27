import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import {
  Signin,
  Signup,
  Root,
  UserProfile,
  VideoUpload,
  VideoDetails,
  History,
  Subscribers,
  SubscribedChannelPage,
  LikedPage,
  AboutUs,
  FaqPage,
} from "../Pages";
import { ProtectedRoutes } from "../ProtectedRoutes";
import {
  CommingSoon,
  ForgetPassword,
  ForgetNewPassword,
  ResetPassword,
  UpdateCoverImage,
  UpdateAvatar,
  UpdateUserDetails,
} from "../Components";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Oops</div>,
    children: [
      { path: "", element: <Root /> },
      { path: "search", element: <Root /> }, //done
      { path: "signin", element: <Signin /> }, //done
      { path: "signup", element: <Signup /> }, //done
      { path: "video/:id", element: <VideoDetails /> }, //done - subscribered to user, comment - 
      {
        path: "upload-a-video",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <VideoUpload /> }],  //--fail
      },
      {
        path: "user/history",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <History /> }], //done
      },
      { path: "/channel/:username", element: <UserProfile /> }, //done - subscribered to user, comment - failed
      {
        path: "subscriber/:username",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <Subscribers /> }], //done
      },
      {
        path: "subscribed-channel/:username",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <SubscribedChannelPage /> }], //done
      },
      {
        path: "liked-videos",
        element: <ProtectedRoutes />,
        children: [{ index: true, element: <LikedPage /> }], //done
      },
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
