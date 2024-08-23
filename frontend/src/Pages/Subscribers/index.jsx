import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SubscriberCard } from "../../Components/SubscriberCard";
import Title from "../../Title";
import "@splidejs/react-splide/css";
import { Loader } from "../../Components/Loader";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { toast } from "react-toastify";
import {
  userSubscriptionRequest,
  userSubscriptionSuccess,
  userSubscriptionFailure,
} from "../../Slices/SubscriberSlices";
import { extractErrorMessage } from "../../extractErrorMessage";
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
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.get(`/api/v1/subscriber/${username}`, config);
      dispatch(userSubscriptionSuccess(res.data?.data));
      // console.log("res", res.data.data);
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
            <p className="mt-4 md:mt-0 text-center">Please subscriber any</p>
          ) : (
            <section tag="section">
              <p className="text-center text-xl text-blue-gray-600">
                {" "}
                You have {subscribers?.totalSubscribers} subscribers{" "}
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
                class="splide"
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
