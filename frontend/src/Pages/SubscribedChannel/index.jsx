import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscribedChannel } from "../../actions/SubscriberAction";
import Title from "../../Title";
import "@splidejs/react-splide/css";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import {toast} from 'react-toastify'
import { SubscribedChannelCard } from "../../Components/SubscribedChannelCard";

export const SubscribedChannel = () => {
  const { loading, error, subscriber } = useSelector(
    (state) => state.userSubscribedChannel
  );
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserSubscribedChannel());
    }
    if (error) {
      toast.error(error);
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <div className="p-10 mt-20 ">
      <Title title="Subscribed Channels" />
      {loading ? (
        <p className="mt-4 md:mt-0 text-center">Please subscriber any</p>
      ) : (
        <section tag="section">
          <Splide
            options={{
              rewind: true,
              gap: "1rem",
            }}
            class="splide"
            data-splide='{"perPage":2}'
            aria-label="My Favorite Images"
          >
            {subscriber &&
              subscriber.subscribers.map((sub, index) => (
                <SplideSlide key={index}>
                  <SubscribedChannelCard sub={sub} />
                </SplideSlide>
              ))}
          </Splide>
        </section>
      )}
    </div>
  );
};
