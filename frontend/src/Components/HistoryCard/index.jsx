import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from "@material-tailwind/react";


export function HistoryCard({ his }) {
  const date = new Date(his.createdAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "short",
    day: "2-digit",
  });
  return (
    <Card className="w-full bg-gradient  sm:w-96 h-auto shadow-xl border-l-4  border-t-4 border-secondarybg border-r-[0.5px]   border-b-[0.5px]  ">
      <CardHeader shadow={false} floated={false} className="h-60">
        <img
          src={his.thumbnail}
          alt={his.title}
          className="h-full w-full object-cover hover:scale-125 transition duration-150 ease-in-out"
        />
      </CardHeader>
      <CardBody className="h-32 sm:h-36 overflow-clip">
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium text-white/90">
            {his.views} Views
          </Typography>
          <Typography color="blue-gray" className="font-medium text-white/90">
            {formattedDate}
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75 text-white/60"
        >
          {his.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-gradient text-white/90 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          {his.title}
        </Button>
      </CardFooter>
    </Card>
  );
}
