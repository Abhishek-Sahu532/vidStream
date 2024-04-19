import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
 
export function Sidebar() {
  const [open, setOpen] = React.useState(0);
//   const [openAlert, setOpenAlert] = React.useState(true);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-[100%] w-full max-w-[13rem] p-4 shadow-xl shadow-blue-gray-900/5 ">
      {/* <div className=" flex items-center gap-1 pb-16">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Youtube
        </Typography>
      </div> */}
      <List>
       
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2}>
         
              <ListItemPrefix className="border-b-0 p-3">
              <IoMdHome className="h-6 w-6" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Home
              </Typography>
          </ListItem>
          <ListItem className="p-0" selected={open === 2}>
         <ListItemPrefix className="border-b-0 p-3">
           <ShoppingBagIcon className="h-5 w-5" />
         </ListItemPrefix>
         <Typography color="blue-gray" className="mr-auto font-normal">
           Subscription
         </Typography>
     </ListItem>
        </Accordion>
        <hr className="my-1 w-40 border-blue-gray-400" />
        <ListItem>
          You  <MdKeyboardArrowRight className='h-6 w-6   ' />
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Your Channel
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <RiChatHistoryFill  className="h-5 w-5" />
          </ListItemPrefix>
          History
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <MdPlaylistAddCheckCircle className="h-5 w-5" />
          </ListItemPrefix>
          Playlists
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <MdWatchLater className="h-5 w-5" />
          </ListItemPrefix>
          Watch later
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BiSolidLike className="h-5 w-5" />
          </ListItemPrefix>
          Liked Videos
        </ListItem>
       <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
     
    </Card>
  );
}