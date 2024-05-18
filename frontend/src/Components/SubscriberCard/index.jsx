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
    console.log(sub)
    const date = new Date(sub.createdAt);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "short",
      day: "2-digit",
    })
    return (
      <Card className="w-96">
        {/* <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={sub.avatar}
            alt={sub.fullname}
            className="h-full w-full object-cover hover:scale-125 transition duration-150 ease-in-out"
          />
        </CardHeader>
        <CardBody className="h-36 overflow-clip">
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {sub.views} Views
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              {formattedDate}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {sub.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
       
            {sub.title}
          </Button>
        </CardFooter> */}
      </Card>
    );
  }
  