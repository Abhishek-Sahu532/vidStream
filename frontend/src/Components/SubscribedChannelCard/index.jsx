import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SubscribedChannelCard({ sub }) {
  return (
    <Card className="w-full  bg-grident sm:w-96 h-auto shadow-xl border-l-4  border-t-4 border-secondarybg border-r-[0.5px]   border-b-[0.5px] ">
    <CardHeader shadow={false} floated={false} className="h-48 sm:h-80">
      <img
        src={sub.avatar}
        alt={sub.fullname}
        className="h-full w-full object-cover hover:scale-125 transition duration-150 ease-in-out"
      />
    </CardHeader>
    <CardBody className="h-24 sm:h-20 overflow-clip">
      <div className="mb-2 flex items-center justify-between">
        <Typography color="blue-gray" className="text-white/80 font-semibold">
          Total Subscribers: {sub.subscribersCount}
        </Typography>
      </div>
      <Typography
        variant="small"
        color="gray"
        className="font-normal opacity-75"
      >
        {sub.about}
      </Typography>
    </CardBody>
    <CardFooter className="pt-0">
      <Link to={`/channel/${sub.username}`}>
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-gradient text-white/90 font-semibold shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          {sub.fullname}
        </Button>
      </Link>
    </CardFooter>
  </Card>
  
  );
}
