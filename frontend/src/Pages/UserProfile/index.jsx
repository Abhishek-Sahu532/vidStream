import React, { useState } from "react";
import { UserProfileTabs } from "../../Components/UserProfileTabs";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChannelProfile } from "../../actions/UserAction";
import { Loader } from "../../Components/Loader";
import {
  createASubscriber,
  deleteASubscriber,
} from "../../actions/SubscriberAction";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { CREATE_SUBSCRIBER_RESET } from "../../constaints/SubscriberConstaints";
import Title from "../../Title";
import { UpdateProfileDialogBox } from "../../Components/UpdateProfileDialogBox";
import { Link } from "react-router-dom";
import bannerImage from '../../assets/Images/channels_banner.jpg'


export const UserProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.userProfile);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { message, error: subscriberError } = useSelector(
    (state) => state.createSubscriber
  );

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleASubscriberButton = () => {
    if (!isAuthenticated) {
      toast.error("Please Login");
      return;
    }
    if (data?.isSubscribedTo) {
      //if subscbribed
      dispatch(deleteASubscriber(data._id));
    } else {
      dispatch(createASubscriber(data._id));
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      return;
    }
    if (subscriberError) {
      toast.error(subscriberError);
      return;
    }
    if (message?.success) {
      toast.success(message?.message);
      dispatch({ type: CREATE_SUBSCRIBER_RESET });
    }
    // if (!isAuthenticated) {
    //   toast.error("Please Login");
    //   return;
    // }
    dispatch(getChannelProfile(username));
  }, [dispatch, toast, isAuthenticated, error, username, toast, message]);
  return (
    <>
      {loading && loading ? (
        <Loader />
      ) : (
        <section className="w-full overflow-hidden dark:bg-gray-900 mt-20">
          <Title title={`${data?.fullname}`} />
          {/* COVER IMAGE */}
          <div className="bg-cover h-112">
            <img
              src={
                data && data.coverImage
                  ? data.coverImage
                  : bannerImage
              }
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
                    src={data?.avatar}
                    alt="channel_logo"
                  />
                  <div className="ml-4 sm:ml-6">
                    <div className="text-xl sm:text-2xl  flex items-center">
                      <span className="mr-2 text-primarybg ">{data?.fullname}</span>
                      <span className="w-3 h-3 text-white inline-block text-center rounded-full bg-grey-dark text-2xs">
                        &#10003;
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm text-primarybg font-bold ">
                      {data?.subscribersCount} subscribers
                    </p>
                  </div>
                </div>

                {isAuthenticated && username == user.username ? (
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
                      {data && data.isSubscribedTo
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
                <UserProfileTabs userVideos={data?.videos} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
