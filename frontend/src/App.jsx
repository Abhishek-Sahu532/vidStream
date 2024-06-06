
import "react-toastify/dist/ReactToastify.css";

import { NavbarWithSearch } from "./Components/Navbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "./actions/UserAction";
import "./App.css";


function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user);

  //to get the user and logged in the app
  useEffect(() => {
    dispatch(getUserDetails());
  }, []);

  useEffect(() => {
    // Store the current URL in session storage whenever it changes
    sessionStorage.setItem("lastVisitedUrl", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      const lastVisitedUrl = sessionStorage.getItem("lastVisitedUrl");
      if (lastVisitedUrl) {
        navigate(lastVisitedUrl);
      } else {
        navigate("/myprofile");
      }
    } else {
      navigate("/signin");
    }
  }, [navigate]);
  return (
    <div className="w-screen overflow-auto overflow-x-hidden h-screen font-quicksand">
      <NavbarWithSearch />
      <Outlet />

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
