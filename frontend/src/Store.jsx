import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import {
  forgetPasswordReducer,
  userReducer,
  getUserProfileReducer,
  getUserWatchHistoryReducer,
} from "./reducers/UserReducer";
import { getAllVideosReducer, videoReducer } from "./reducers/VideoReducer";
import {
  allCommentReducer,
  createCommentReducer,
} from "./reducers/CommentReducer";
import {
  createSubscriberReducer,
  getUserSubscriberReducer,
  getUserSubscribedChannelReducer,
} from "./reducers/SubscribeReducer";
import {
 AddLikeDislikeReducerReducer
} from "./reducers/LikeReducer";

const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  videos: getAllVideosReducer,
  forgetPassword: forgetPasswordReducer,
  createComment: createCommentReducer,
  comments: allCommentReducer,
  userProfile: getUserProfileReducer,
  createSubscriber: createSubscriberReducer,
  userHistory: getUserWatchHistoryReducer,
  userSubscriber: getUserSubscriberReducer,
  userSubscribedChannel: getUserSubscribedChannelReducer,
  addVideoLikeDislike: AddLikeDislikeReducerReducer,
  
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
