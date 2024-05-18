import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserSubscriber } from "../../actions/SubscriberAction";
import { useParams } from "react-router-dom";
import { SubscriberCard } from "../../Components/SubscriberCard";
import Title from "../../Title";
import "@splidejs/react-splide/css";

import { Splide, SplideSlide } from "@splidejs/react-splide";

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
  }, [isAuthenticated, user, dispatch]);
  return (
    <div className="p-10 mt-20 ">
      <Title title="History" />
      {loading ? (
        <p className="mt-4 md:mt-0 text-center">
        Please subscriber any
        </p>
      ) : (
        <section tag="section">
          <Splide
            options={{
              rewind: true,
              gap: "1rem",
            }}
            class="splide"
            data-splide='{"perPage":4}'
            aria-label="My Favorite Images"
          >
            {subscriber &&
              subscriber.data.map((sub, index) => (
                <SplideSlide key={index}>
                  <SubscriberCard sub={sub} />
                </SplideSlide>
              ))}
          </Splide>
        </section>
      )}
    </div>
  );
};
