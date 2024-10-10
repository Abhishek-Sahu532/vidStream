import { configureStore } from "@reduxjs/toolkit";
import UserSlices from "./Slices/UserSlices";
import  CommentSlices  from "./Slices/CommentSlices";
import SubscriberSlices from "./Slices/SubscriberSlices";
import LikeSlices from "./Slices/LikeSlices";
import videoSlices  from "./Slices/VideoSlices";
import ChannelSlices from "./Slices/ChannelSlices";

export const store = configureStore({
  reducer: {
    user: UserSlices,
    subscribers: SubscriberSlices,
    comments: CommentSlices,
    videos: videoSlices,
    likes: LikeSlices,
    channel: ChannelSlices,
  },
});
