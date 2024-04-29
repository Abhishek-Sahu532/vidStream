import "./App.css";
import { NavbarWithSearch } from "./Components/Navbar";
import { VideoPlayer } from "./Components/VideoPlayer";
import { Routes, Route } from "react-router-dom";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { VideoDetails } from "./Pages/VideoDetails";
import {VideoUpload} from './Pages/VideoUpload'
import Root from "./Pages/Root";



function App() {
  return (
    <>
      <NavbarWithSearch />
    
      <Routes>
        <Route path='/' Component={Root}  />
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/videos" Component={VideoPlayer} />
        <Route path="/video-detail" Component={VideoDetails} />
        <Route path="/video-upload" Component={VideoUpload} />
       
      </Routes>
    </>
  );
}

export default App;
