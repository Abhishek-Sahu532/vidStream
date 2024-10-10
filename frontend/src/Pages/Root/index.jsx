import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Advertisement,
  VideoDetailsCard,
  LoadingSkeleton,
} from "../../Components";
import {
  allVideosRequest,
  allVideosSuccess,
  allVideosFailure,
} from "../../redux/Slices/VideoSlices";
import axios from "axios";
import { extractErrorMessage } from "../../lib/extractErrorMessage";

export const Root = () => {
  const { loading, videos } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6); // Default page size to 6
  const [isFetching, setIsFetching] = useState(false);

  const fetchAllVideos = useCallback(
    async ({ page = 1, pageSize = 6 }) => {
      try {
        dispatch(allVideosRequest());
        if (import.meta.env.VITE_DEV_MODE == "production") {
          const res = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/v1/video/all-videos?page=${page}&limit=${pageSize}` 
          );
          console.log(import.meta.env.VITE_BACKEND_URL)
          dispatch(allVideosSuccess(res?.data?.data || []));
        } else {
          const res = await axios.get(
            `/api/v1/video/all-videos?page=${page}&limit=${pageSize}`
          );
          dispatch(allVideosSuccess(res?.data?.data || []));
        }
      } catch (error) {
        let htmlError = extractErrorMessage(error.response?.data);
        dispatch(allVideosFailure(htmlError || error.message));
      }
    },
    [dispatch]
  );

  useEffect(() => {
    fetchAllVideos({ page, pageSize });
  }, [page, pageSize, fetchAllVideos]);

  const fetchMoreData = () => {
    if (!isFetching) {
      setIsFetching(true);
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (isFetching) {
      fetchAllVideos({ page, pageSize }).finally(() => setIsFetching(false));
    }
  }, [isFetching, page, pageSize, fetchAllVideos]);
  return (
    <>
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
              {Array.isArray(videos) && videos.length > 0 ? (
                videos.map((video, index) => (
                  <div key={index}>
                    <VideoDetailsCard vid={video} />
                  </div>
                ))
              ) : (
                <p>No videos available</p>
              )}
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
    </>
  );
};
