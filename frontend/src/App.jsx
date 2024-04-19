import "./App.css";
import { NavbarWithSearch } from "./Components/Navbar";
import { Sidebar } from "./Components/Sidebar";
import { VideoPlayer } from "./Components/VideoPlayer";
import { Routes, Route } from "react-router-dom";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";

function App() {
  return (
    <>
      {/* <NavbarWithSearch />
      <Sidebar /> */}
      <Routes>
        {/* <Route path='/' element={}  /> */}
        <Route path="/signin" Component={Signin} />
        <Route path="/signup" Component={Signup} />
        <Route path="/videos" Component={VideoPlayer} />
        
        
      </Routes>
    </>
  );
}

export default App;
