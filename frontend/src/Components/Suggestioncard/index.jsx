import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function SuggestionCard() {
  return (
    <Card className="w-full mb-4 flex-row  bg-blue-gray-100">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-32  shrink-0 rounded-r-none"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader> 
      <CardBody className="p-3">
        <Typography
          className="text p-0 mb-1 h-11 text-md font-semibold text-wrap break-words overflow-hidden text-ellipsis whitespace-nowrap truncate ..."
        >
          startupsd ddddddddd ddddddddddd ddddddddddddd ddddddddddd
          ddddddddddddddddddddd
        </Typography>
        <hr className="text-blue-gray-800"/>
        <Typography
          className="p-0 mt-1 h-10 text-sm text-wrap break-words overflow-hidden text-ellipsis whitespace-nowrap truncate ..."
        >
        Channel
        </Typography>
        
        <div className="flex justify-around">
            <Typography>Views</Typography>
            <Typography> time</Typography>
        </div>
      </CardBody>
    </Card>
  );
}
