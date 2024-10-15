import { useEffect } from "react";
import { SuggestionCard } from "../../Components/Suggestioncard";
import { VideoPlayer } from "../../Components/VideoPlayer";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../Components/Loader";
import {
  getVideoRequest,
  getVideoSuccess,
  getVideoReset,
  getVideoFailure,
  getVideoRecommendationRequest,
  getVideoRecommendationSuccess,
  getVideoRecommendationFailure,
} from "../../redux/Slices/VideoSlices";
import { extractErrorMessage } from "../../lib/extractErrorMessage";
import axios from "axios";

export const VideoDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, videos, recommendVideos } = useSelector(
    (state) => state.videos
  );
  const { success } = useSelector((state) => state.user);
  const filteredRecommendations = recommendVideos?.recommvideos?.filter(
    (vid) => vid._id !== id
  );
  //get video details accordingly to the video id
  const getVideosDetails = async (id) => {
    try {
      dispatch(getVideoRequest());
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/video/${id}`
        );
        dispatch(getVideoSuccess(res.data.data));
      } else {
        const res = await axios.get(`/api/v1/video/${id}`);
        dispatch(getVideoSuccess(res.data.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(getVideoFailure(errorMessage || error.message));
    }
  };

  //RECOMMENDATION VIDEOS
  const getVideoRecommendations = async () => {
    try {
      dispatch(getVideoRecommendationRequest());
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/users/video-recommentions`,
          { withCredentials: true }
        );
        dispatch(getVideoRecommendationSuccess(res.data.data));
      } else {
        const res = await axios.get("/api/v1/users/video-recommentions");
        dispatch(getVideoRecommendationSuccess(res.data.data));
      }
    } catch (error) {
      // const errorMessage = extractErrorMessage(error.response?.data);
      // dispatch(getVideoRecommendationFailure(errorMessage || error.message));
    }
  };

  useEffect(() => {
    getVideoRecommendations();
    getVideosDetails(id);
    if (!success) {
      toast.info("Please sign in to access your personalized recommendations!");
    }
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(getVideoReset());
      //video reset
    };
  }, [dispatch]);
  return (
    <div className="pt-20">
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          {loading ? (
            <div className="min-h-screen justify-center items-center">
              <Loader />
            </div>
          ) : (
            <VideoPlayer video={videos} />
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          {loading ? (
            <Loader />
          ) : (
            filteredRecommendations &&
            filteredRecommendations?.map((vid, index) => (
              <SuggestionCard vid={vid} key={index} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
