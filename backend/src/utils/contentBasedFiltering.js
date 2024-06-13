import natural from "natural";

const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Use TF-IDF and cosine similarity to find videos similar to those the user has watched.
export async function computeTFIDF(videos) {
  videos.forEach((video) => {
    tfidf.addDocument(video.description, video._id.toString());
  });
}

export function getSimilarVideos(video, videos) {
  const similarities = [];
  tfidf.tfidfs(video.description, (i, measure) => {
    similarities.push({ video: videos[i], score: measure });
  });
  return similarities.sort((a, b) => b.score - a.score).map((sim) => sim.video);
}
