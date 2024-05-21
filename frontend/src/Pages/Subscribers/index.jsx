import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscriber } from "../../actions/SubscriberAction";
import { useParams } from "react-router-dom";
import { SubscriberCard } from "../../Components/SubscriberCard";
import Title from "../../Title";
import "@splidejs/react-splide/css";
import { Loader } from "../../Components/Loader";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import { toast } from "react-toastify";

export const Subscribers = () => {
  const { loading, error, subscriber } = useSelector(
    (state) => state.userSubscriber
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { username } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserSubscriber(username));
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, user, dispatch]);
  return (
    <div className="p-10 mt-20 ">
      <Title title="Subscriber" />

      {loading ? (
        <Loader />
      ) : (
        <>
          {subscriber && subscriber.subscribers.length < 0 ? (
            <p className="mt-4 md:mt-0 text-center">Please subscriber any</p>
          ) : (
            <section tag="section">
              <p className="text-center text-xl text-blue-gray-600">
                {" "}
                You have {subscriber?.totalSubscribers} subscribers{" "}
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
                {subscriber &&
                  subscriber.subscribers.map((sub, index) => (
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
