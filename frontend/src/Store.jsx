import { configureStore  } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { fetchUserHistoryReducer, forgetPasswordReducer, userReducer, getUserProfileReducer } from "./reducers/UserReducer";
import {  getAllVideosReducer, videoReducer } from "./reducers/VideoReducer"; 
import { allCommentReducer, createCommentReducer } from "./reducers/CommentReducer";
import { createSubscriberReducer } from "./reducers/SubscribeReducer";


const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  videos: getAllVideosReducer,
  forgetPassword: forgetPasswordReducer,
  history : fetchUserHistoryReducer,
  createComment : createCommentReducer,
  comments : allCommentReducer,
  userProfile : getUserProfileReducer,
  createSubscriber : createSubscriberReducer,
});


export const store = configureStore({
  reducer : rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
 
});
