import React from "react";
import HoverVideoPlayer from "react-hover-video-player";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { formatTimeDifference } from "../dateformat";

export const VideoDetailsCard = ({ vid }) => {
 
  return (
    <Link to={`/video/${vid?._id}`} aria-label={`View details of ${vid?.title}`}>
      <Card className="max-w-[21rem]   overflow-hidden shadow-[1px_5px_10px_5px_#9197c3] hover:shadow-[-1px_5px_15px_10px_#9197c3] h-auto">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none h-full"
        >
          <HoverVideoPlayer
            videoSrc={vid?.videoFile}
            className="w-full h-full object-cover"
            pausedOverlay={
              <img
                src={vid?.thumbnail}
                alt={vid?.title}
                className="w-full h-52 object-cover"
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
          <Tooltip content={vid?.uploader?.fullname}>
            <Avatar
              size="sm"
              variant="circular"
              alt={vid?.uploader?.fullname}
              src={vid?.uploader?.avatar}
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Typography className="mt-[-30px] pl-12 line-clamp-1  overflow-hidden">{vid?.title}</Typography>
          <Typography className="mt-1 text-sm h-15 line-clamp-2   overflow-hidden">
            {vid?.description}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between mt-[-1rem] py-2 px-5">
          <Tooltip content={vid?.uploader?.fullname}>
            <Typography
              variant="lead"
              color="gray"
              className="mt-1 font-extralight text-md"
            >
              {vid?.uploader?.fullname}
            </Typography>
          </Tooltip>
          <Typography className="font-normal text-md">
            {formatTimeDifference(vid?.createdAt)}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};
