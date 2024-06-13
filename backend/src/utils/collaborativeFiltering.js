
import { Like } from '../models/like.model.js';


// To recommend videos liked by users with similar tastes, we look at the users who liked the same videos and recommend videos they have liked.

export async function getSimilarUsers(userId) {
  const likes = await Like.find({ like: userId }).exec();
  const videoIds = likes.map((like) => like.video);

  const similarUsersLikes = await Like.find({
    video: { $in: videoIds },
    like: { $ne: userId },
  }).exec();

  const userLikesMap = new Map();
  similarUsersLikes.forEach((like) => {
    if (!userLikesMap.has(like.like)) {
      userLikesMap.set(like.like, []);
    }
    userLikesMap.get(like.like).push(like.video);
  });

  return userLikesMap;
}

export async function getRecommendedVideosFromUsers(similarUsers) {
  const videoCounts = new Map();

  for (const [user, videos] of similarUsers.entries()) {
    videos.forEach((video) => {
      if (!videoCounts.has(video)) {
        videoCounts.set(video, 0);
      }
      videoCounts.set(video, videoCounts.get(video) + 1);
    });
  }

  return Array.from(videoCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);
}
