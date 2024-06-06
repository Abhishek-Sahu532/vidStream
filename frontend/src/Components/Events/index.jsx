import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Advertisement() {
  return (
    <div className="p-4 px-10 rounded-l-xl border border-[#9197c3] rounded-xl mx-4 mt-24 ">
      <Typography variant="small" className="font-bold mb-2 text-[#7174ad] ">
        Upcoming Events
      </Typography>
      <Typography variant="h3" className='text-[#494b66]'>
        Tech Summit: Shaping Tomorrow
      </Typography>
      <Typography className="mt-2 mb-6 !text-base font-normal text-[#494b66]">
        Prepare to be part of dynamic conversations that will redefine the
        boundaries.
      </Typography>
      <Link to="/events">
        <Button variant="outlined" className="flex-shrink-0 text-primarybg">
          join now
        </Button>
      </Link>
    </div>
  );
}
