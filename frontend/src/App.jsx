import "./App.css";
import { NavbarWithSearch } from "./Components/Navbar";
import { VideoPlayer } from "./Components/VideoPlayer";
import { Routes, Route } from "react-router-dom";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { VideoDetails } from "./Pages/VideoDetails";
import { VideoUpload } from "./Pages/VideoUpload";
import Root from "./Pages/Root";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProfile } from "./Pages/UserProfile";
import { MyProfile } from "./Pages/MyProfile";
import { ForgetNewPassword } from "./Components/ForgetNewPassword";
import { ForgetPassword } from "./Components/ForgetPassword";

function App() {
  return (
    <div className="w-screen overflow-auto overflow-x-hidden h-screen">
      <NavbarWithSearch />

      
      <Routes>
        <Route path="/" Component={Root} />
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        {/* <Route path="/videos" Component={VideoPlayer} /> */}
        <Route path="/video/:id" Component={VideoDetails} />
        <Route path="/upload-a-video" Component={VideoUpload} />
        <Route path="/user-profile" Component={UserProfile} />
        <Route path="/my-profile" Component={MyProfile} />
        <Route path="/forget-password" Component={ForgetPassword} />
        <Route path="/forget-password/:token" Component={ForgetNewPassword} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
