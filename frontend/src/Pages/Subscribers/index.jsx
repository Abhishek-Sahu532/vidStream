import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SubscriberCard } from "../../Components/SubscriberCard";
import Title from "../../lib/Title";
import "@splidejs/react-splide/css";
import { Loader } from "../../Components/Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { toast } from "react-toastify";
import {
  userSubscriptionRequest,
  userSubscriptionSuccess,
  userSubscriptionFailure,
} from "../../redux/Slices/SubscriberSlices";
import { extractErrorMessage } from "../../lib/extractErrorMessage";
import axios from "axios";

export const Subscribers = () => {
  const { loading, error, subscribers } = useSelector(
    (state) => state.subscribers
  );
  const { success } = useSelector((state) => state.user);

  const { username } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserSubscriber = async () => {
    try {
      dispatch(userSubscriptionRequest());
      const config = { headers: { "Content-Type": "application/json" },  withCredentials: true };

      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/subscriber/${username}`,
          config
        );
        dispatch(userSubscriptionSuccess(res.data?.data));
      } else {
        const res = await axios.get(`/api/v1/subscriber/${username}`, config);
        dispatch(userSubscriptionSuccess(res.data?.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(userSubscriptionFailure(errorMessage || error.message));
    }
  };
  useEffect(() => {
    if (!success) {
      navigate("/signin");
    }
    getUserSubscriber();
    if (error) {
      toast.error(error);
    }
  }, [dispatch]);
  return (
    <div className="p-10 mt-20 ">
      <Title title="Subscriber" />

      {loading ? (
        <Loader />
      ) : (
        <>
          {subscribers && subscribers?.subscribers?.length < 0 ? (
            <p className="mt-4 md:mt-0 text-center text-white/90">Please subscriber any</p>
          ) : (
            <section tag="section">
              <p className="text-center text-xl text-white/90 mb-2 font-semibold">
                {" "}
                You have {subscribers?.totalSubscribers} subscribers
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
                {subscribers &&
                  subscribers?.subscribers?.map((sub, index) => (
                    <SplideSlide key={index}>
                      <SubscriberCard sub={sub} />
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
