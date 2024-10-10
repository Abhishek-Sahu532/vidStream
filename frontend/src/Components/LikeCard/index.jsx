import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Avatar,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";



export const LikeCard = ({ like }) => {
  return (
    <Link to={`/video/${like.videoDetails._id}`}>
      <Card className="w-full bg-grident sm:w-96 h-auto shadow-xl border-l-4  border-t-4 border-secondarybg border-r-[0.5px]   border-b-[0.5px] mt-2">


        <CardHeader shadow={true} floated={false} className="h-60">
          <img
            src={like.videoDetails.thumbnail}
            alt={like.title}
            className="h-full w-full object-cover hover:scale-125 transition duration-150 ease-in-out"
          />
        </CardHeader>
        <CardBody className="h-28  overflow-clip">
          <div className="mb-2 flex items-center justify-between">
            <Typography className="font-medium text-white/90">
              Title : {like.videoDetails.title}
            </Typography>
            <Typography color="blue-gray" className="font-medium text-white/90">
              Total Views : {like.videoDetails.views}
            </Typography>
          </div>
          <Typography
            variant="small"
            className="font-normal opacity-75 text-white/70 overflow-hidden "
          >
            {like.videoDetails.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex gap-4 justify-center">
          <Button
            ripple={false}
            fullWidth={true}
            className="text-white/90  shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex gap-4 justify-center items-center bg-gradient"
          >
            <Avatar src={like.uploaderData.avatar} size="sm" alt={like.title} />
            {like.uploaderData.fullname}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
