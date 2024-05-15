import * as React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { Signin } from "../Pages/Signin";
import { Signup } from "../Pages/Signup";
import { VideoDetails } from "../Pages/VideoDetails";
import { VideoUpload } from "../Pages/VideoUpload";
import Root from "../Pages/Root";

import { UserProfile } from "../Pages/UserProfile";
import { MyProfile } from "../Pages/MyProfile";
import { ForgetNewPassword } from "../Components/ForgetNewPassword";
import { ForgetPassword } from "../Components/ForgetPassword";
import ProtectedRoutes from "../ProtectedRoutes";
import App from "../App";
import { History } from "../Pages/History";
import { CommingSoon } from "../Components/CommingSoon";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Root />} />

      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />

      <Route path="video/:id" element={<VideoDetails />} />

      <Route path="forget-password" element={<ForgetPassword />} />
      <Route path="forget-password/:token" element={<ForgetNewPassword />} />

      <Route path="upload-a-video" element={<ProtectedRoutes />}>
        <Route index element={<VideoUpload />} />
      </Route>

      <Route path="my-profile" element={<ProtectedRoutes />}>
        <Route index element={<MyProfile />} />
      </Route>

      {/* <Route path="channel" element={<ProtectedRoutes />}>
        <Route index element={<UserProfile />} />
      </Route> */}
      <Route path="user/history" element={<ProtectedRoutes />}>
        <Route index element={<History />} />
      </Route>
      <Route path="subcription" element={<ProtectedRoutes />}>
        <Route index element={<CommingSoon />} />
      </Route>
      <Route path="playlists" element={<ProtectedRoutes />}>
        <Route index element={<CommingSoon />} />
      </Route>
      <Route path="watch-later" element={<ProtectedRoutes />}>
        <Route index element={<CommingSoon />} />
      </Route>
      <Route path="liked-videos" element={<ProtectedRoutes />}>
        <Route index element={<CommingSoon />} />
      </Route>
      <Route path="user/inbox" element={<ProtectedRoutes />}>
        <Route index element={<CommingSoon />} />
      </Route>
      <Route path="help" element={<ProtectedRoutes />}>
        <Route index element={<CommingSoon />} />
      </Route>

      <Route path="channel/:username" element={<UserProfile />} />
      <Route path="FAQ" element={<CommingSoon />} />
      <Route path="about-us" element={<CommingSoon />} />
      <Route path="*" element={<CommingSoon />} />
    </Route>
  )
);

export default router;
