import { useState, useEffect } from "react";
import {
  Avatar,
  ButtonGroup,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Typography,
} from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { CommentSection } from "../CommentSection";
import Title from "../../Title";
import { Link } from "react-router-dom";
import { ShareComponent } from "../ShareComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { addAVideoLikeDislike } from "../../actions/Like.Action";
// import { ADD_VIDEO_LIKE_DISLIKE_RESET } from "../../constaints/LikeConsttaints";
import {
  addVideoLikeDislikeRequest,
  addVideoLikeDislikeSuccess,
  addVideoLikeDislikeFailure,
  addVideoLikeDislikeReset,
} from "../../Slices/LikeSlices";
import { extractErrorMessage } from "../../extractErrorMessage";
import axios from "axios";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

export const VideoPlayer = ({ video }) => {
  const dateString = video?.video?.createdAt;
  const date = new Date(dateString);
  const dispatch = useDispatch();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });
  const [likesCount, setLikesCount] = useState(video?.likesCount);

  const [dislikesCount, setDislikesCount] = useState(video?.dislikesCount);
  const [userLiked, setUserLiked] = useState(video?.userLiked);
  const [userDisliked, setUserDisliked] = useState(video?.userDisliked);

  const navigate = useNavigate();
  const { success } = useSelector((state) => state.user);
  const { likes } = useSelector((state) => state.likes);
  // const { message } = useSelector((state) => state.addVideoLikeDislike);

  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [shareComOpen, setShareComOpen] = useState(false);
  const handleShareComOpen = () => setShareComOpen(true);
  const handleShareComClose = () => setShareComOpen(false);

  const handleSubscriber = () => {
    if (success) {
      navigate(`/channel/${video?.video?.uploader?.username}`);
    } else {
      toast.error("Please Login");
      navigate("/signin");
    }
  };

//HANDLE LIKES AND DISLIKES

  const addAVideoLikeDislike = async (videoId, action) => {
    // console.log('videoId', videoId, action)
    try {
      dispatch(addVideoLikeDislikeRequest());
      const config = { headers: { "Content-Type": "application/json" } };
      const res = await axios.post(
        `/api/v1/like/add-a-likeDislike/${videoId}`,
        { action },
        config
      );
      // console.log(res.data);
      dispatch(addVideoLikeDislikeSuccess(res.data));
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      // console.log(errorMessage);
      dispatch(addVideoLikeDislikeFailure(errorMessage || error.message));
    }
  };

  const handleLikeBtn = () => {
    if (!success) {
      toast.error("Please Login");
      return;
    }
    if (!userLiked) {
      setLikesCount((prev) => prev + 1);
      if(userDisliked) {
        setDislikesCount((prev) => prev - 1);
        setUserDisliked(false);
      }
      setUserLiked(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setUserLiked(false);
    }
    // console.log(video?.video?._id);
    addAVideoLikeDislike(video?.video?._id, "like");
  };

  const handleDislikeBtn = () => {
    if (!success) {
      toast.error("Please Login");
      return;
    }
    if (!userDisliked) {
      setDislikesCount((prev) => prev + 1);
      if (userLiked) {
        setLikesCount((prev) => prev - 1);
        setUserLiked(false);
      }
      setUserDisliked(true);
    } else {
      setDislikesCount((prev) => prev - 1);
      setUserDisliked(false);
    }

    addAVideoLikeDislike(video?.video?._id, "dislike");
  };

  //WILL LOOK INTO IT
  useEffect(() => {
    if (likes?.success) {
      dispatch(addVideoLikeDislikeReset());
    }
  }, [success, dispatch]);

  return (
    // <></>
    <div>
      <Title title={video?.video?.title} />
      <div>
        <video className="h-full w-full rounded-lg" controls muted>
          <source src={video?.video?.videoFile} />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* description area */}

      <div className="p-2 flex flex-col sm:flex-row gap-1 sm:gap-2">
        <div className="flex justify-around items-center sm:items-center sm:gap-5">
          <div className="pl-2 sm:pl-4">
            <Link to={`/channel/${video?.video?.uploader?.username}`}>
              <Avatar
                src={video?.video?.uploader?.avatar}
                alt="avatar"
                size="md"
              />
            </Link>
          </div>

          <div className="pl-2 sm:pl-4">
            <Link to={`/channel/${video?.video?.uploader?.username}`}>
              <p className="text-xl">{video?.video?.uploader?.fullname}</p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between mt-2 sm:mt-0 sm:ml-auto">
          <div className="mr-0 sm:mr-8">
            <Button
              variant="outlined"
              className="size-fit p-2 sm:p-3 py-2 px-2 sm:px-6"
              onClick={handleSubscriber}
            >
              Subscribe
            </Button>
          </div>

          <div className="flex gap-1  mt-2 sm:mt-0">
            <div className="flex w-max flex-col gap-2 sm:gap-4">
              <ButtonGroup variant="text" size="sm">
                <Button
                  onClick={handleLikeBtn}
                  className="flex items-center gap-2 sm:gap-3"
                >
                  {/* Like Icon */}

                  {likesCount}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={video?.userLiked ? "black" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                    />
                  </svg>
                </Button>

                <Button
                  className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3"
                  onClick={handleDislikeBtn}
                >
                  {/* Dislike Icon */}
                  {dislikesCount}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={video?.userDisliked ? "black" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                    />
                  </svg>
                </Button>
              </ButtonGroup>
            </div>
            <div className="flex gap-1 sm:gap-2">
              <Button
                variant="outlined"
                className="size-fit p-2 sm:p-3 py-2 px-2 sm:px-6 flex items-center justify-center"
                onClick={handleShareComOpen}
              >
                <span className="hidden md:inline-block lg:inline-block">
                  Share
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                  />
                </svg>
              </Button>
              <ShareComponent
                open={shareComOpen}
                handleClose={handleShareComClose}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 p-4 flex flex-col gap-2">
        <div className="flex gap-4 ">
          <Typography className="font-semibold ">
            {video?.video?.views} Views
          </Typography>
          <Typography className="font-semibold ">{formattedDate}</Typography>
        </div>

        <div className="mb-6">
          {video?.video?.description == undefined ? (
            ""
          ) : (
            <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
              <AccordionHeader
                onClick={() => handleOpen(1)}
                className="text-sm"
              >
                Video Description
              </AccordionHeader>
              <AccordionBody>{video?.video?.description}</AccordionBody>
            </Accordion>
          )}
        </div>
      </div>
      <CommentSection />
    </div>
  );
};
