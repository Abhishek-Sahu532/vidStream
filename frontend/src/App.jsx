import "react-toastify/dist/ReactToastify.css";
import { NavbarWithSearch } from "./Components";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import axios from "axios";
import {
  currentUserRequest,
  currentUserSucess,
  currentUserFailure,
} from "./Slices/UserSlices";
import { extractErrorMessage } from "./extractErrorMessage";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { success, currentUser } = useSelector((state) => state.user);
  //to get the user and logged in the app


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        dispatch(currentUserRequest());
        if (import.meta.env.VITE_DEV_MODE == "production") {
          const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`,
            { withCredentials: true }
          );
          console.log(import.meta.env.VITE_BACKEND_URL);
          dispatch(currentUserSucess(res.data.data));
        } else {
          const res = await axios.get("/api/v1/users/current-user");
          dispatch(currentUserSucess(res.data.data));
        }
      } catch (error) {
        let htmlError = extractErrorMessage(error.response?.data);
        // dispatch(currentUserFailure(htmlError || error.message));
      }
    };
    fetchCurrentUser();
  }, [dispatch]);

  useEffect(() => {
    // Store the current URL in session storage whenever it changes
    sessionStorage.setItem("lastVisitedUrl", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (success) {
      const lastVisitedUrl = sessionStorage.getItem("lastVisitedUrl");
      // console.log("lastVisitedUrl", lastVisitedUrl);
      if (lastVisitedUrl !== "/signin") {
        navigate(lastVisitedUrl);
      } else {
        navigate(`/channel/${currentUser?.username}`);
      }
    }
  }, [success, navigate]);
  return (
    <div className="w-screen overflow-auto overflow-x-hidden h-screen font-quicksand">
      <NavbarWithSearch />
      <Outlet />
      <ToastContainer stacked 
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
