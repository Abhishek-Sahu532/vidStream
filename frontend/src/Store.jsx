import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/UserReducer";
import { videoReducer } from "./reducers/VideoReducer";

const rootReducer = combineReducers({
  user: userReducer,
  video : videoReducer
});

// const initialState = {};
// const middleware = [thunk];

const store = configureStore({
  reducer : rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),

});

console.log('store', store)
export default store;
