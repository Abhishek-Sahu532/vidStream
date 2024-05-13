import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import { store } from "./Store.jsx";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import router from "./Router";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    {/* </PersistGate> */}
  </React.StrictMode>
);
