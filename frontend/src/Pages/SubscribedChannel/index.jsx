import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../lib/Title";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { toast } from "react-toastify";
import { SubscribedChannelCard } from "../../Components/SubscribedChannelCard";
import { Loader } from "../../Components/Loader";
import { useNavigate, useParams } from "react-router-dom";
import {
  userSubscriberedRequest,
  userSubscriberedSuccess,
  userSubscriberedFailure,
} from "../../redux/Slices/SubscriberSlices";
import { extractErrorMessage } from "../../lib/extractErrorMessage";
import axios from "axios";

export const SubscribedChannelPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { success } = useSelector((state) => state.user);
  const { subscribers, loading, error } = useSelector(
    (state) => state.subscribers
  );
  const navigate = useNavigate();

  //function to handle the dispatch actions
  const getUserSubscribedChannel = async (username) => {
    try {
      dispatch(userSubscriberedRequest());
      const config = { headers: { "Content-Type": "application/json" },  withCredentials: true };

      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/subscriber/subscribed-channels/${username}`,
          config
        );
        dispatch(userSubscriberedSuccess(res?.data?.data));
      } else {
        const res = await axios.get(
          `/api/v1/subscriber/subscribed-channels/${username}`,
          config
        );
        dispatch(userSubscriberedSuccess(res?.data?.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(userSubscriberedFailure(errorMessage || error.message));
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    if (!success) {
      navigate("/signin");
    }
    if (error) {
      toast.error(error);
    }
    getUserSubscribedChannel(username);
  }, [dispatch, success, error]);
  return (
    <div className="p-10 pt-20 ">
      <Title title="Subscribed Channels" />
      {loading ? (
        <Loader />
      ) : (
        <>
          {subscribers && subscribers?.channels?.length < 0 ? (
            <p className="mt-4 md:mt-0 text-center text-white/90">Please subscriber any</p>
          ) : (
            <section tag="section">
              <p className="text-center text-xl text-white/90 font-semibold ">
                {` You have subscribed ${subscribers?.totalChannels} Channels`}
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
                  subscribers?.channels?.map((sub, index) => (
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
