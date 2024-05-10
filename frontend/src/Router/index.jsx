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

      {/* <Route
        path="upload-a-video"
        element={<ProtectedRoutes element={<VideoUpload />} />}
      /> */}
      <Route path="user-profile" element={<UserProfile />} />
      <Route path="my-profile" element={<MyProfile />} />
      <Route path="forget-password" element={<ForgetPassword />} />
      <Route path="forget-password/:token" element={<ForgetNewPassword />} />

      {/* <Route>
<Route
        path="upload-a-video" 
        element={<VideoUpload />} exact
      />
</Route> */}
    </Route>
  )
);

export default router;
