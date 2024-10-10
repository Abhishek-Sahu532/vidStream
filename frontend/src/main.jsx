import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import { store } from "./redux/Store.jsx";
import { Provider } from "react-redux";
import router from "./Router";
import { RouterProvider } from "react-router-dom";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
