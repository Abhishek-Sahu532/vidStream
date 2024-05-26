import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    CardFooter,
    Button,
  } from "@material-tailwind/react";
  import { Link } from "react-router-dom";
  
  export function SubscriberCard({ sub }) {
    const date = new Date(sub.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "short",
      day: "2-digit",
    })
    return (
      <Card className="w-full sm:w-80">
      <CardHeader shadow={false} floated={false} className="h-48 sm:h-80">
        <img
          src={sub.avatar}
          alt={sub.fullname}
          className="h-full w-full object-cover hover:scale-125 transition duration-150 ease-in-out"
        />
      </CardHeader>
      <CardBody className="h-24 sm:h-20 overflow-clip">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            Total Subscribers: {sub.subscriberSubscriptionsCount}
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
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            {sub.fullname}
          </Button>
        </Link>
      </CardFooter>
    </Card>
    
    );
  }
  