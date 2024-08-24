import React, { useEffect } from "react";
import { HistoryCard } from "../../Components";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Title from "../../Title.jsx";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import {
  userHistoryRequest,
  userHistorySuccess,
  userHistoryFailure,
} from "../../Slices/UserSlices.js";
import axios from "axios";
import { extractErrorMessage } from "../../extractErrorMessage.js";

export const History = () => {
  const dispatch = useDispatch();
  const { history, error, loading } = useSelector(
    (state) => state.user
  );

  const getUserWatchhistory = async () => {
    try {
      dispatch(userHistoryRequest());
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/history`, { withCredentials: true}
        );
        dispatch(userHistorySuccess(res.data?.data));
      } else {
        const res = await axios.get(`/api/v1/users/history`);
        dispatch(userHistorySuccess(res.data?.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(userHistoryFailure(errorMessage || error.message));
      console.log("error", errorMessage);
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    getUserWatchhistory();
  }, [dispatch, error, toast]);
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
            className="splide"
            data-splide='{"perPage":3}'
          >
            {history &&
              history?.map((his, index) => (
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
