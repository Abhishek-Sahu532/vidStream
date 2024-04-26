import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Drawer,
  Button,
} from "@material-tailwind/react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import { MdKeyboardArrowRight } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";

export function Sidebar() {
  // const [open, setOpen] = React.useState(0);
  const [drawerOpen, setdrawerOpen] = React.useState(false);
  const openDrawer = () => setdrawerOpen(true);
  const closeDrawer = () => setdrawerOpen(false);
  return (
    <>
      {" "}
      <Button className="bg-transparent  text-black shadow-none hover:shadow-none" onClick={openDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </Button>

      <Drawer open={drawerOpen} onClose={closeDrawer} className="mt-20 w-10 shadow-none h-[100vh]">
        <Card className="h-[100vh]">
          {/* <div className=" flex items-center gap-1 pb-16">
        <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="brand" className="h-8 w-8" />
        <Typography variant="h5" color="blue-gray">
          Youtube
        </Typography>
      </div> */}

          <List className="bg-black text-white h-full">
            <Link to="/">
              <ListItem className="p-0" selected={open === 2}>
                <ListItemPrefix className="border-b-0 p-3">
                  <IoMdHome className="h-6 w-6" />
                </ListItemPrefix>
                <Typography  className="mr-auto font-normal">
                  Home
                </Typography>
              </ListItem>
            </Link>
            <Link to="/subscription">
            <ListItem className="p-0" selected={open === 2}>
              <ListItemPrefix className="border-b-0 p-3">
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal">
                Subscription
              </Typography>
            </ListItem>
            </Link>
            <hr className="my-1 w-40 border-blue-gray-400" />
            <ListItem>
              You <MdKeyboardArrowRight className="h-6 w-6   " />
            </ListItem>
            <Link to="/channel">
            <ListItem>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Your Channel
            </ListItem>
            </Link>
            <Link to="/history">
            <ListItem>
              <ListItemPrefix>
                <RiChatHistoryFill className="h-5 w-5" />
              </ListItemPrefix>
              History
            </ListItem>
            </Link>
            <Link to="/playlists">
            <ListItem>
              <ListItemPrefix>
                <MdPlaylistAddCheckCircle className="h-5 w-5" />
              </ListItemPrefix>
              Playlists
            </ListItem>
            </Link>
            <Link to="/WL">
            <ListItem>
              <ListItemPrefix>
                <MdWatchLater className="h-5 w-5" />
              </ListItemPrefix>
              Watch later
            </ListItem>
            </Link>
            <Link to="/LL">
            <ListItem>
              <ListItemPrefix>
                <BiSolidLike className="h-5 w-5" />
              </ListItemPrefix>
              Liked Videos
            </ListItem>
            </Link>
            <Link to="/settings">
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            </Link>
            <ListItem>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
