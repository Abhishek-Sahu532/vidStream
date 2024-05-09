import * as React from "react";
import {
  createBrowserRouter
} from "react-router-dom";
import Root from '../Pages/Root'



const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
    }
  ]);
  

  export default router