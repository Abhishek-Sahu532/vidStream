import React, { useState, useEffect } from "react";
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
import InfiniteScroll from 'react-infinite-scroll-component';

export const Root = () => {
  const { loading, videos = [] } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [page, setPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('page')) || 1;
  });

  const [pageSize] = useState(6);
  const [hasMore, setHasMore] = useState(true);

  const updateURL = (newPage) => {
    const newURL = new URL(window.location);
    newURL.searchParams.set('page', newPage);
    newURL.searchParams.set('limit', pageSize);
    window.history.pushState({}, '', newURL);
  };


  const fetchAllVideos = async () => {
    try {
      dispatch(allVideosRequest());
      const res = await axios.get(
        `${
          import.meta.env.VITE_DEV_MODE == "production"
            ? import.meta.env.VITE_BACKEND_URL
            : ""
        }/api/v1/video/all-videos?page=${page}&limit=${pageSize}`
      );
      const videoData = res?.data?.data || [];
      if (page === 1) {
        dispatch(allVideosSuccess(videoData));
      } else {
        dispatch(allVideosSuccess([...videos, ...videoData])); // Append new data to existing videos
      }
      // If the number of videos fetched is less than the pageSize, stop further loading
      if (videoData.length <pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      const htmlError = extractErrorMessage(error.response?.data);
      dispatch(allVideosFailure(htmlError || error.message));
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, [page]);

  const fetchMoreData = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    console.log(page)
       updateURL(page);
    }
  };
  
  return (
    <>
      <div className="pt-24 relative"  >
        <Advertisement />
        <div >
          {loading && page === 1 ? (
            <div className="flex gap-10 p-8 mb-3 flex-wrap justify-around ">
              {Array(6)
                .fill()
                .map((_, index) => (
                  <LoadingSkeleton key={index} />
                ))}
            </div>
          ) : (
            <InfiniteScroll
              className="flex gap-10 p-8 flex-wrap justify-around"
              dataLength={4}
              next={fetchMoreData} // Function to load more videos
              hasMore={hasMore} // Boolean indicating if there's more data to load
              endMessage={
                <p className="text-center text-white  relative  ">
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {videos.length > 0 ? (
                videos.map((video, index) => (
                  <div key={index}>
                    <VideoDetailsCard vid={video} />
                  </div>
                ))
              ) : (
                <p>No videos available</p>
              )}
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};
