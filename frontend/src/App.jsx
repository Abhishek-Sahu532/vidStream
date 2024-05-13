import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { NavbarWithSearch } from "./Components/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "./actions/UserAction";

function App() {
const dispatch = useDispatch()
useEffect(()=>{

dispatch(getUserDetails());
},[])


  return (
    <div className="w-screen overflow-auto overflow-x-hidden h-screen">
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
