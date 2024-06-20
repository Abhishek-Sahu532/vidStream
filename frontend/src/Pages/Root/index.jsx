import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Advertisement } from "../../Components/Events";
import { VideoDetailsCard } from "../../Components/VideoDetailsCard";
import { fetchAllVideos } from "../../actions/VideoAction";
import { Loader } from "../../Components/Loader";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import { LoadingSkeleton } from "../../Components/LoadingSkeletion";

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
  }, [page]);

  const fetchMoreData = () => {
    setIsFetching(true);
    console.log(isFetching, "1");
    setPage((prev) => prev + 1);
    setIsFetching(false);
  };

  return (
    <div>
      <Advertisement />

      <div>
        {loading ? (
          <div className="flex gap-10 p-8 flex-wrap justify-around overflow-auto">
            {Array(6)
              .fill()
              .map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
          </div>
        ) : (
          <div className="flex gap-10 p-8 flex-wrap justify-around overflow-auto">
            {videos.map((video, index) => (
              <div key={index}>
                <VideoDetailsCard vid={video} />
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={fetchMoreData}
        className="mx-auto bg-primarybg p-3 text-white font-bold mb-4 font-quicksand rounded-2xl  flex items-center hover:shadow-[-1px_5px_15px_10px_#9197c3]"
        disabled={isFetching}
      >
        {isFetching ? "Loading..." : "Load More"}
      </button>
    </div>
  );
};

export default Root;
