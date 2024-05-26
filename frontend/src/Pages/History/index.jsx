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
  const { error, history, loading } = useSelector((state) => state.userHistory);
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
