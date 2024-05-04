import { useSelector, useDispatch } from "react-redux";
import { Advertisement } from "../../Components/Events";
import { VideoDetailsCard } from "../../Components/VideoDetailsCard";
import { useEffect } from "react";
import { fetchAllVideos } from "../../actions/VideoAction";
import {Loader} from '../../Components/Loader'
const Root = () => {
  const { loading, videos } = useSelector((state) => state.videos);
  console.log(videos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllVideos());
  }, []);

  return (
    <div>
      <Advertisement />

      {loading && loading ? (
        <Loader />
      ) : (
        <div className="flex gap-10 p-8 flex-wrap justify-around ">
          {videos &&
            videos.map((video, index) => (
              <VideoDetailsCard vid={video} key={index} />
            ))}

          {/* <VideoDetailsCard />
<VideoDetailsCard /> */}
        </div>
      )}
    </div>
  );
};

export default Root;
