import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../Title";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { toast } from "react-toastify";
import { SubscribedChannelCard } from "../../Components/SubscribedChannelCard";
import { getUserSubscribedChannel } from "../../actions/SubscriberAction";
import { useParams } from "react-router-dom";
import {Loader } from '../../Components/Loader'



export const SubscribedChannelPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { loading, success, error, subscribedChannels } = useSelector(
    (state) => state.userSubscribedChannel
  );

  console.log(loading, success, error, subscribedChannels);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserSubscribedChannel(username));
    }
    if (error) {
      toast.error(error);
    }
  }, [dispatch, isAuthenticated, error]);

  return (
    <div className="p-10 mt-20 ">
      <Title title="Subscribed Channels" />
      {loading ? (
        <Loader />
      ) : (
        <>
          {subscribedChannels && subscribedChannels.channels.length < 0 ? (
            <p className="mt-4 md:mt-0 text-center">Please subscriber any</p>
          ) : (
            <section tag="section">
              <p className="text-center text-xl text-blue-gray-600">
                {" "}
                You have subscribed {
                  subscribedChannels?.totalChannels  
                }  Channels{" "}
              </p>
              <Splide
                options={{
                  rewind: true,
                  gap: "1rem",
                }}
                class="splide"
                data-splide='{"perPage":2}'
                aria-label="My Favorite Images"
              >
                {subscribedChannels &&
                  subscribedChannels.channels.map((sub, index) => (
                    <SplideSlide key={index}>
                      <SubscribedChannelCard sub={sub} />
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
