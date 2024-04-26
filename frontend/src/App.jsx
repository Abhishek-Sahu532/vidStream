import "./App.css";
import { NavbarWithSearch } from "./Components/Navbar";
import { VideoPlayer } from "./Components/VideoPlayer";
import { Routes, Route } from "react-router-dom";
import { Signin } from "./Pages/Signin";
import { Signup } from "./Pages/Signup";
import { VideoDetails } from "./Pages/VideoDetails";
import Root from "./Pages/Root";
import  {SuggestionCard } from "./Components/Suggestioncard";

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
        <Route path="/a" Component={SuggestionCard} />
      </Routes>
    </>
  );
}

export default App;
