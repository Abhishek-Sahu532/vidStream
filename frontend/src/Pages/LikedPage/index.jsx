import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Title from "../../Title.jsx";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { LikeCard, Loader } from "../../Components";
import {
  getLikedVideosRequest,
  getLikedVideosRequestSuccess,
  getLikedVideosRequestFailure,
} from "../../Slices/LikeSlices.js";
import { extractErrorMessage } from "../../extractErrorMessage.js";
import axios from "axios";

export const LikedPage = () => {
  const dispatch = useDispatch();
  const { likes, loading } = useSelector((state) => state.likes);

  //function to get the liked videos
  const getUsersLikedVideo = async () => {
    try {
      dispatch(getLikedVideosRequest());
      const config = { headers: { "Content-Type": "application/json" } };
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/like/liked-videos`,
          config
        );
        dispatch(getLikedVideosRequestSuccess(res.data?.data));
      } else {
        const res = await axios.get(`/api/v1/like/liked-videos`, config);
        dispatch(getLikedVideosRequestSuccess(res.data?.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(getLikedVideosRequestFailure(errorMessage || error.message));
    }
  };

  useEffect(() => {
    getUsersLikedVideo();
  }, [dispatch]);
  return (
    <div className="p-10 mt-20 ">
      <Title title="Likes" />
      {loading ? (
        <Loader />
      ) : (
        <>
          {likes && likes?.length == 0 ? (
            <p className="mt-4 md:mt-0 text-center">
              Nothing here to show. Please like the videos.
            </p>
          ) : (
            <section tag="section">
              <p className="text-center text-xl text-blue-gray-600">
                {` You have liked ${likes?.length} Videos`}
              </p>
              <Splide
                options={{
                  rewind: true,
                  lazyLoad: "nearby",
                  gap: "2rem",
                  breakpoints: {
                    640: {
                      perPage: 2,
                      gap: "7rem",
                    },
                    480: {
                      perPage: 1,
                      gap: ".7rem",
                    },
                  },
                }}
                className="splide"
                data-splide='{"perPage":3}'
              >
                {likes?.map((like, index) => (
                  <SplideSlide key={index}>
                    <LikeCard like={like} />
                  </SplideSlide>
                ))}
              </Splide>
            </section>
          )}
        </>
      )}
    </div>
  );
};
