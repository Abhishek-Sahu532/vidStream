import HoverVideoPlayer from "react-hover-video-player";
import thumbnail from "../../assets/Images/thumbnail.jpg";
import videoFile from "../../assets/Images/videoFile.mp4";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";



export const VideoDetailsCard = ({vid}) => {
  return (
    <div>
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
                    // Make the image expand to cover the video's dimensions
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
{/* watch it this section, specially avatar and tooltip */}
        <CardBody>
          <Tooltip content="Natali Craig">
            <Avatar
              size="sm"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>

          <Typography variant="h6" color="blue-gray" className="mt-[-30px] pl-12 ">
            {vid.title}
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-1 font-extralight text-sm"
          >
            {" "}
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
                {" "}
                video owner name
              </Typography>
            </Tooltip>
          </div>
          <Typography className="font-normal text-xs">January 10</Typography>
        </CardFooter>
      </Card>
    </div>
  );
};
