import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
  
  export function HistoryCard() {
    return (
      <Card className="w-350px mb-4 flex-row  bg-blue-gray-100 mt-14">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 lg:w-64 lg:h-52 md:w-52 md:h-40 w-40    shrink-0 rounded-r-none"
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader> 
        <CardBody className="p-3">
          <Typography
            className="text p-0 mb-1 h-11 text-md font-semibold text-wrap break-words overflow-hidden"
          >
            startupsd ddddddddd ddddddddddd ddddddddddddd ddddddddddd
            ddddddddddddddddddddd
          </Typography>
          <hr className="text-blue-gray-800"/>
          <Typography
            className="p-0 mt-4 h-10 text-lg text-wrap break-words overflow-hidden "
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
  