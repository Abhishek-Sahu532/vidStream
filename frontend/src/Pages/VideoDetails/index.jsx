import { useEffect } from "react";
import { SuggestionCard } from "../../Components/Suggestioncard";
import { VideoPlayer } from "../../Components/VideoPlayer";
import { useSelector, useDispatch } from "react-redux";
import { getVideosDetails } from "../../actions/VideoAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../../Components/Loader";

export const VideoDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { loading, error, video } = useSelector(
    (state) => state.video
  );
 
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getVideosDetails(id));
  }, [toast, error, dispatch]);
  return (
    <>
      {loading && loading ? (
        <Loader />
      ) : (
        <div className="p-8 mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4">
          <div className="col-span-2">
            <VideoPlayer video={video} />
          </div>
          <div className="col-span-2 md:col-span-1 ">
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
            <SuggestionCard />
          </div>
        </div>
      )}
    </>
  );
};
