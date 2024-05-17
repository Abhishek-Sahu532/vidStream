import React, { useEffect } from "react";
import { HistoryCard } from "../../Components/HistoryCard";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserWatchhistory } from "../../actions/UserAction";
import Title from "../../Title.jsx";
import "@splidejs/react-splide/css";

import { Splide, SplideSlide } from "@splidejs/react-splide";

export const History = () => {
  const dispatch = useDispatch();
  const { error, success, history, loading } = useSelector(
    (state) => state.userHistory
  );
  // console.log(history)

  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
    if (error) {
      toast.error(error);
    }
    dispatch(getUserWatchhistory());
  }, [dispatch, getUserWatchhistory, navigate, isAuthenticated, error, toast]);

  return (
    <div className="p-10 mt-20 ">
      <Title title="History" />
      {loading ? (
        <p className="mt-4 md:mt-0 text-center">
          Nothing here to show. Please watch the videos.
        </p>
      ) : (
        <section tag="section">
          {/* {history && history.map((his, index) => (
        <div key={index} className="w-[30rem]  rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <HistoryCard  his={his} />

        </div>
      ))} */}
          <Splide
            options={{
              rewind: true,
              gap: "1rem",

            }}
            class="splide"
            data-splide='{"perPage":4}'
            aria-label="My Favorite Images"
          >
            {history &&
              history.map((his, index) => (
                <SplideSlide key={index}>
                  <HistoryCard his={his} />
                </SplideSlide>
              ))}
          </Splide>
        </section>
      )}
    </div>
  );
};
