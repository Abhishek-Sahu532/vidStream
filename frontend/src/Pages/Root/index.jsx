import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Advertisement } from "../../Components/Events";
import { VideoDetailsCard } from "../../Components/VideoDetailsCard";
import { fetchAllVideos } from "../../actions/VideoAction";
import { Loader } from "../../Components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Root = () => {
  const { loading, videos } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [videoList, setVideoList] = useState(videos);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(fetchAllVideos(page));
  }, [dispatch, page]);


  const fetchMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (!loading && videos.length === 0) {
      setHasMore(false);
    }
  }, [loading, videos]);

  return (
    <div>
      <Advertisement />
      {loading  ? (
        <Loader />
      ) : (
        <InfiniteScroll
          dataLength={videos.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Loader />}
        >
          <div className="flex gap-10 p-8 flex-wrap justify-around">
            {videos &&
              videos.map((video, index) => (
                <VideoDetailsCard vid={video} key={index} />
              ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default Root;
