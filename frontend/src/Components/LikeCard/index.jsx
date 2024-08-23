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
      <Card className="w-full sm:w-96">
        <CardHeader shadow={false} floated={false} className="h-48 sm:h-96">
          <img
            src={like.videoDetails.thumbnail}
            alt={like.title}
            className="h-full w-full object-cover hover:scale-125 transition duration-150 ease-in-out"
          />
        </CardHeader>
        <CardBody className="h-32 sm:h-36 overflow-clip">
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              Title : {like.videoDetails.title}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              Total Views : {like.videoDetails.views}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {like.videoDetails.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex gap-4 justify-center">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 flex gap-4 justify-center items-center"
          >
            <Avatar src={like.uploaderData.avatar} size="sm" alt={like.title} />
            {like.uploaderData.fullname}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
