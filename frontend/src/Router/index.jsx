import * as React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../Layout";

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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
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

      <Route path="user-profile" element={<ProtectedRoutes />}>
        <Route index element={<UserProfile />} />
      </Route>
    </Route>
  )
);

export default router;
