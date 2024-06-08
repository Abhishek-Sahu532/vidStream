import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Advertisement } from "../../Components/Events";
import { VideoDetailsCard } from "../../Components/VideoDetailsCard";
import { fetchAllVideos } from "../../actions/VideoAction";
import { Loader } from "../../Components/Loader";

const Root = () => {
  const { loading, videos } = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const pageSize = 3; // Adjust this value based on the number of videos fetched per page

  useEffect(() => {
    dispatch(fetchAllVideos({ page,pageSize  }));
  }, [dispatch, page]);

  const lastVideoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
          console.log(page);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    if (videos.length < pageSize) {
      setHasMore(false);
    }
  }, [videos, pageSize]);

  return (
    <div>
      <Advertisement />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex gap-10 p-8 flex-wrap justify-around overflow-auto">
          {videos &&
            videos.map((video, index) => {
              if (videos.length === index + 1) {
                return (
                  <div ref={lastVideoElementRef} key={index} >
                    <VideoDetailsCard vid={video} />
                  </div>
                );
              } else {
                return <VideoDetailsCard vid={video} key={index} />;
              }
            })}
        </div>
      )}
    </div>
  );
};

export default Root;
