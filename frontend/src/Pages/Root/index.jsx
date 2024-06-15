import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { Advertisement } from "../../Components/Events";
import { VideoDetailsCard } from "../../Components/VideoDetailsCard";
import { fetchAllVideos } from "../../actions/VideoAction";
import { Loader } from "../../Components/Loader";

const Root = () => {
  const { loading, videos } = useSelector((state) => state.videos);
 
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    dispatch(fetchAllVideos({ page }));
  }, [dispatch, page]);

  const fetchMoreData = () => {
    console.log(1)
    if (loading) return;
    const nextPage = page + 1;
    dispatch(fetchAllVideos({ page: nextPage })).then((response) => {
      if (response.payload.length === 0) {
        setHasMore(false);
      } else {
        setPage(nextPage);
      }
    });
  };

  return (
    <div>
      <Advertisement />
      <InfiniteScroll
        dataLength={videos.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Loader />}
        endMessage={<p style={{ textAlign: "center" }}>Yay! You have seen it all</p>}
      >
        <div className="flex gap-10 p-8 flex-wrap justify-around overflow-auto">
          {videos &&
            videos.map((video, index) => {
              return (
                <div key={index}>
                  <VideoDetailsCard vid={video} />
                </div>
              );
            })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Root;
