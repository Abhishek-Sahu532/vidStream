import mongoose from "mongoose";
import {User} from '../models/user.model.js'
import {Like} from '../models/like.model.js'


export async function fetchUserData(userId) {
    const user = await User.findById(userId).populate('watchHistory').exec();
    const likes = await Like.find({ like: userId }).populate('video').exec();
  
    return {
      watchHistory: user.watchHistory,
      likedVideos: likes.map(like => like.video),
    };
  }