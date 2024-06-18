import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Advertisement } from "../../Components/Events";
import { VideoDetailsCard } from "../../Components/VideoDetailsCard";
import { fetchAllVideos } from "../../actions/VideoAction";
import { Loader } from "../../Components/Loader";
import { Button } from "@material-tailwind/react";

const Root = () => {
  const { loading, videos, error } = useSelector((state) => state.videos);

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [videoList, setVideoList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const prevPageRef = useRef(page);
  const [isFetching, setIsFetching] = useState(false);
  // console.log(videos);

  useEffect(() => {
    dispatch(fetchAllVideos({ page }));
    console.log(page, hasMore, isFetching);
  }, [ page]);

  const fetchMoreData = () => {
    setIsFetching(true);
    console.log(isFetching, "1");
    setPage((prev) => prev + 1);
    setIsFetching(false);
  };

  return (
    <div>
      <Advertisement />
      <div className="flex gap-10 p-8 flex-wrap justify-around overflow-auto">
        {videos.map((video, index) => (
          <div key={index}>
            <VideoDetailsCard vid={video} />
          </div>
        ))}
      </div>
      {loading && <Loader />}
      {/* {!isFetching && !hasMore && ( */}
      <Button onClick={fetchMoreData} className="my-auto" disabled={isFetching}>
        {isFetching ? "Loading..." : "Load More"}
      </Button>
      {/* )} */}
      {/* {!isFetching && hasMore && (
        <p style={{ textAlign: "center" }}>Yay! You have seen it all</p>
      )} */}
    </div>
  );
};

export default Root;
