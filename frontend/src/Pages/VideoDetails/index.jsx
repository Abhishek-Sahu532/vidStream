import { useEffect } from "react";
import { SuggestionCard } from "../../Components/Suggestioncard";
import { VideoPlayer } from "../../Components/VideoPlayer";
import { useSelector, useDispatch } from "react-redux";
import { getVideosDetails } from "../../actions/VideoAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../Components/Loader";
import { getVideoRecommendations } from "../../actions/UserAction";
import { GET_USER_VIDEO_RECOMMENDATIONS_RESET } from "../../constaints/UserConstaints";
import { VIDEO_DETAILS_RESET } from "../../constaints/VideoConstaints";

export const VideoDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, video } = useSelector((state) => state.video);
  const { loading: recommLoading, data: recommendations } = useSelector(
    (state) => state.videoRecommendations
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    console.log("Dispatching getVideosDetails and getVideoRecommendations");
    dispatch(getVideosDetails(id));
    dispatch(getVideoRecommendations());

    return () => {
      dispatch({ type: VIDEO_DETAILS_RESET });
      dispatch({ type: GET_USER_VIDEO_RECOMMENDATIONS_RESET });
    };
  }, [dispatch, id, error]);

  console.log("Loading:", loading);
  console.log("Video:", video);
  console.log("Error:", error);

  return (
    <div className="mt-32">
      {loading ? (
        <div className="min-h-screen justify-center items-center">
        <Loader />
        </div>
      ) : (
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="col-span-2">
            <VideoPlayer video={video} />
          </div>
          <div className="col-span-2 md:col-span-1">
            {recommLoading ? (
              <Loader />
            ) : (
              recommendations &&
              recommendations.map((vid, index) => (
                <SuggestionCard vid={vid} key={index} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
