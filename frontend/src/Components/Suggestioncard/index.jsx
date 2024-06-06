import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function SuggestionCard({ vid }) {
  const dateString = vid.createdAt;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });
  console.log("vid", vid);
  return (
    <Card className="w-full mb-4 flex-row  bg-blue-gray-100">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-48  shrink-0 rounded-r-none"
      >
        <img
          src={vid.thumbnail}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="p-3">
        <Typography className="text p-0 mb-1 h-11 text-md font-semibold text-wrap break-words overflow-hidden text-ellipsis whitespace-nowrap truncate ...">
          {vid.title}
        </Typography>
        <hr className="text-blue-gray-800 min-w-fit" />

        <Typography className="p-0 mt-1 h-10 text-sm text-wrap break-words overflow-hidden text-ellipsis whitespace-nowrap truncate ...">
          <Link to={`/channel/${vid?.uploader?.username}`}> {vid.uploader.username}</Link>
        </Typography>

        <div className="flex justify-between">
          <Typography> Views {vid.views}</Typography>
          <Typography>Date {formattedDate}</Typography>
        </div>
      </CardBody>
    </Card>
  );
}
