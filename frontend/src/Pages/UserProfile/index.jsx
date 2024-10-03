import React, { useState } from "react";
import {
  UserProfileTabs,
  Loader,
  UpdateProfileDialogBox,
} from "../../Components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../../Title";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import bannerImage from "../../assets/Images/channels_banner.jpg";
import {
  getUserChannelRequest,
  getUserChannelrSucess,
  getUserChannelFailure,
} from "../../Slices/ChannelSlices";
import {
  createSubscriberRequest,
  createSubscriberSuccess,
  createSubscriberFailure,
  deleteSubscriberRequest,
  deleteSubscriberSuccess,
  deleteSubscriberFailure,
  userSubscriberReset,
} from "../../Slices/SubscriberSlices";
import axios from "axios";
import { extractErrorMessage } from "../../extractErrorMessage";

export const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, channel } = useSelector((state) => state.channel);
  const { success, currentUser } = useSelector((state) => state.user);
  const {
    message,
    success: subscriberSuccess,
    error: subscriberError,
  } = useSelector((state) => state.subscribers);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //getting the channel information
  const getChannelProfile = async () => {
    try {
      dispatch(getUserChannelRequest());
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/c/${username}`,
          { withCredentials: true }
        );
        dispatch(getUserChannelrSucess(res?.data?.data));
      } else {
        const res = await axios.get(`/api/v1/users/c/${username}`);
        dispatch(getUserChannelrSucess(res?.data?.data));
      }
    } catch (error) {
      let htmlError = extractErrorMessage(error.response?.data);
      dispatch(getUserChannelFailure(htmlError || error.message));
    }
  };
  useEffect(() => {
    getChannelProfile();
  }, [dispatch]);

  //HANDLE SUBSCRIBER
  const handleASubscriberButton = async () => {
    if (!success) {
      toast.error("Please Login");
      return;
    }
    console.log(channel?.isSubscribedTo);
    if (channel?.isSubscribedTo) {
      //if subscbribed
      try {
        dispatch(deleteSubscriberRequest());
        const config = { headers: { "Content-Type": "application/json" } };

        if (import.meta.env.VITE_DEV_MODE == "production") {
          const res = await axios.delete(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/v1/subscriber/delete-a-subscriber/${channel?._id}`
          );
          dispatch(deleteSubscriberSuccess(res.data));
        } else {
          const res = await axios.delete(
            `/api/v1/subscriber/delete-a-subscriber/${channel?._id}`,
            config
          );
          dispatch(deleteSubscriberSuccess(res.data));
        }
      } catch (error) {
        let htmlError = extractErrorMessage(error.response?.data);
        dispatch(deleteSubscriberFailure(htmlError || error.message));
      }
    } else {
      try {
        dispatch(createSubscriberRequest());
        const config = { headers: { "Content-Type": "application/json" } };
        if (import.meta.env.VITE_DEV_MODE == "production") {
          const res = await axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/v1/subscriber/create-a-subscriber/${channel?._id}`,
            config
          );
          dispatch(createSubscriberSuccess(res.data));
        } else {
          const res = await axios.post(
            `/api/v1/subscriber/create-a-subscriber/${channel?._id}`,
            config
          );
          dispatch(createSubscriberSuccess(res.data));
        }
      } catch (error) {
        let htmlError = extractErrorMessage(error.response?.data);
        dispatch(createSubscriberFailure(htmlError || error.message));
      }
    }
    getChannelProfile(); // to update the values
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    if (!success) {
      navigate("/signin");
    }
    if (subscriberError) {
      toast.error(subscriberError);
      return;
    }
    if (subscriberSuccess) {
      // toast.success(message?.message);
      dispatch(userSubscriberReset());
    }
  }, [error, success, message]);
  return (
    <>
      {loading && loading ? (
        <Loader />
      ) : (
        <section className="w-full overflow-hidden  mt-20">
          <Title title={`${channel?.fullname}`} />
          {/* COVER IMAGE */}
          <div className="bg-cover ">
            <img
              src={
                channel && channel?.coverImage
                  ? channel?.coverImage
                  : bannerImage
              }
              className="w-full h-56"
              alt="banner"
            />
          </div>
          {/* PROFILE CONTAINER */}
          <div className="-mt-1 bg-grey-lighter">
            <div className="container mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-4 sm:px-16">
                <div className="flex items-center">
                  <img
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full"
                    src={channel?.avatar}
                    alt="channel_logo"
                  />
                  <div className="ml-4 sm:ml-6">
                    <div className="text-xl sm:text-2xl  flex items-center ">
                      <span className="mr-2 text-white/90 ">
                        {channel?.fullname}
                      </span>
                      <span className="w-3 h-3 text-white inline-block text-center rounded-full bg-grey-dark text-2xs">
                        &#10003;
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-white/70 font-bold ">
                      {channel?.subscribersCount} subscribers
                    </p>
                  </div>
                </div>

                {success && username == currentUser?.username ? (
                  <div className="text-grey-dark flex flex-col sm:flex-row md:flex-row items-center mt-4 sm:mt-0">
                    <Button
                      className="rounded-md appearance-none px-3 py-2 bg-primarybg uppercase text-white text-xs sm:text-sm font-semibold mb-2 sm:mb-0 sm:mr-4"
                      onClick={handleOpen}
                      variant="gradient"
                    >
                      Update Profile
                    </Button>
                    <UpdateProfileDialogBox
                      open={open}
                      handleClose={handleClose}
                    />
                    <Link to="/user-videos">
                      <Button className="rounded-md appearance-none px-3 py-2 bg-primarybg uppercase text-white text-xs sm:text-sm font-semibold">
                        Manage Videos
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="mt-4 sm:mt-0 text-grey-dark">
                    <button
                      onClick={handleASubscriberButton}
                      className="appearance-none px-3 py-2 bg-grey-light uppercase text-grey-darker text-xs sm:text-sm mr-4"
                    >
                      {channel && channel?.isSubscribedTo
                        ? "Unsubscribe"
                        : "Subscribe"}
                    </button>
                    <span>
                      <i className="fa fa-bell fa-lg" aria-hidden="true"></i>
                    </span>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-[70%] mt-4 sm:mt-0">
                <UserProfileTabs userVideos={channel?.videos} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
