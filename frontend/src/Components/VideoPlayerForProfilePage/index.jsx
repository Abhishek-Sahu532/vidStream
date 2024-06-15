import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const VideoPlayerForProfilePage = ({ vid }) => {
  const dateString = vid.createdAt;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });
  return (
    <Link to={`/video/${vid._id}`} aria-label={`View details of ${vid.title}`}>
      <Card className="max-w-[17rem]  overflow-hidden shadow-[1px_5px_10px_5px_#9197c3] hover:shadow-[-1px_5px_15px_10px_#9197c3] ">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none h-full"
        >
          <HoverVideoPlayer
            videoSrc={vid.videoFile}
            className="w-full h-full "
            pausedOverlay={
              <img
                src={vid.thumbnail}
                alt={vid.title}
                className="w-full h-full object-cover"
              />
            }
            loadingOverlay={
              <div className="loading-overlay">
                <div className="loading-spinner" />
              </div>
            }
          />
        </CardHeader>
        <CardBody className="">
          <Typography className="mt-[-30px] pl-12">{vid.title}</Typography>
          <Typography className="mt-1 text-sm h-15 line-clamp-2   overflow-hidden">
            {vid.description}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between mt-[-1rem] py-2 px-5">
          <Typography className="font-normal text-md">
            Published Date : {formattedDate}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};
