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
import { Subscribers } from "../Pages/Subscribers";
import { History } from "../Pages/History";
import { UserProfile } from "../Pages/UserProfile";
import { MyProfile } from "../Pages/MyProfile";
import { ForgetNewPassword } from "../Components/ForgetNewPassword";
import { ForgetPassword } from "../Components/ForgetPassword";
import ProtectedRoutes from "../ProtectedRoutes";
import App from "../App";

import { CommingSoon } from "../Components/CommingSoon";
import { SubscribedChannel } from "../Pages/SubscribedChannel";


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

     
      <Route path="user/history" element={<ProtectedRoutes />}>
        <Route index element={<History />} />
      </Route>
      <Route path="subscriber/:username" element={<ProtectedRoutes />}>
        <Route index element={<Subscribers />} />
      </Route>
      <Route path="subscribed-channel/:username" element={<ProtectedRoutes />}>
        <Route index element={<SubscribedChannel />} />
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
