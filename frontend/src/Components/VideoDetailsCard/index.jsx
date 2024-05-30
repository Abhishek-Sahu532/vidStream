import React from 'react';
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
export const VideoDetailsCard = ({ vid }) => {
  const dateString = vid.createdAt;
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });

  return (
    <Link  to={`/video/${vid._id}`}>
      <Card className="max-w-[21rem] overflow-hidden">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
        >
          <div>
            <HoverVideoPlayer
              videoSrc={vid.videoFile}
              pausedOverlay={
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              }
              loadingOverlay={
                <div className="loading-overlay">
                  <div className="loading-spinner" />
                </div>
              }
            />
          </div>
        </CardHeader>
        <CardBody>
          <Tooltip content={vid.uploader.fullname}>
            <Avatar
              size="sm"
              variant="circular"
              alt={vid.uploader.fullname}
              src={vid.uploader.avatar}
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Typography className="mt-[-30px] pl-12 ">{vid.title}</Typography>
          <Typography className="mt-1 font-extralight text-sm h-10 overflow-hidden">
            {vid.description}
          </Typography>
        </CardBody>
        <CardFooter className="flex items-center justify-between mt-[-1rem] py-2 px-5">
          <div className="flex items-center">
            <Tooltip content="video owner name">
              <Typography
                variant="lead"
                color="gray"
                className="mt-1 font-extralight text-xs"
              >
                {vid.uploader.fullname}
              </Typography>
            </Tooltip>
          </div>
          <Typography className="font-normal text-xs">
            {formattedDate}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
}
