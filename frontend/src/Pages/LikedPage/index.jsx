import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Title from "../../Title.jsx";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { LikeCard } from "../../Components/LikeCard/LikeCard.jsx";
import { Loader } from "../../Components/Loader/index.jsx";
import { getUsersLikedVideo } from "../../actions/Like.Action.js";

export const LikedPage = () => {
  const dispatch = useDispatch();
  const { loading, videos } = useSelector((state) => state.likedVideo);

  useEffect(() => {
    dispatch(getUsersLikedVideo());
  }, []);
  return (
    <div className="p-10 mt-20 ">
      <Title title="History" />
      {loading ? (
        <p className="mt-4 md:mt-0 text-center">
          Nothing here to show. Please watch the videos.
        </p>
      ) : (
        <section tag="section">
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
            class="splide"
            data-splide='{"perPage":3}'
          >
            {videos &&
              videos.map((like, index) => (
                <SplideSlide key={index}>
                  <LikeCard like={like} />
                </SplideSlide>
              ))}
          </Splide>
        </section>
      )}
    </div>
  );
};
