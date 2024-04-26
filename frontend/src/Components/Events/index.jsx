import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";


export function Advertisement() {
  return (

  
      <div className="p-4 px-10 rounded-l-xl border border-blue-gray-100 rounded-xl mx-4 mt-24 ">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-bold mb-2"
        >
          Upcoming Events
        </Typography>
        <Typography variant="h3" color="blue-gray">
          Tech Summit: Shaping Tomorrow
        </Typography>
        <Typography className="mt-2 mb-6 !text-base font-normal text-gray-500">
          Prepare to be part of dynamic conversations that will redefine the
          boundaries.
        </Typography>
       <Link to='/events'>
       <Button variant="outlined" className="flex-shrink-0">
          join now
        </Button>
     
       </Link>
         </div>
   
  );
}
