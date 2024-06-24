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
} from "@heroicons/react/24/solid";

import { MdKeyboardArrowRight } from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { MdWatchLater } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export function Sidebar() {
  // const [open, setOpen] = React.useState(0);
  const [drawerOpen, setdrawerOpen] = React.useState(false);
  const openDrawer = () => setdrawerOpen(true);
  const closeDrawer = () => setdrawerOpen(false);
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {" "}
      <Button
        className="bg-transparent text-[#55567e] shadow-none hover:shadow-none"
        onClick={openDrawer}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#55567e"
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
      <Drawer
        open={drawerOpen}
        onClose={closeDrawer}
        className="mt-20 w-10 shadow-none h-[100vh]"
      >
        <Card className="h-[100vh] ">
          <List className="bg-primarybg text-white h-full">
            <Link to="/">
              <ListItem className="p-0" selected={open === 2}>
                <ListItemPrefix className="border-b-0 p-3">
                  <IoMdHome className="h-6 w-6" />
                </ListItemPrefix>
                <Typography className="mr-auto font-quicksand text-md">Home</Typography>
              </ListItem>
            </Link>
            <Link to={`/subscriber/${user?.username}`}>
              <ListItem className="p-0" selected={open === 2}>
                <ListItemPrefix className="border-b-0 p-3">
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography className="mr-auto font-quicksand text-md">
                  Subscriber
                </Typography>
              </ListItem>
            </Link>
            <Link to={`/subscribed-channel/${user?.username}`}>
              <ListItem className="p-0" selected={open === 2}>
                <ListItemPrefix className="border-b-0 p-3">
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography className="mr-auto font-quicksand text-md">
                  Subscribed Channels
                </Typography>
              </ListItem>
            </Link>
            <hr className="my-1 w-52 border-blue-gray-400" />
            <ListItem>
              You <MdKeyboardArrowRight className="h-6 w-6   " />
            </ListItem>
            <Link to={`channel/${user?.username}`}>
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Your Channel
              </ListItem>
            </Link>
            <Link to="/user/history">
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <RiChatHistoryFill className="h-5 w-5" />
                </ListItemPrefix>
                History
              </ListItem>
            </Link>
            <Link to="/playlists">
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <MdPlaylistAddCheckCircle className="h-5 w-5" />
                </ListItemPrefix>
                Playlists
              </ListItem>
            </Link>
            <Link to="/watch-later">
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <MdWatchLater className="h-5 w-5" />
                </ListItemPrefix>
                Watch later
              </ListItem>
            </Link>
            <Link to="/liked-videos">
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <BiSolidLike className="h-5 w-5" />
                </ListItemPrefix>
                Liked Videos
              </ListItem>
            </Link>
            <Link to="/settings">
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
              </ListItem>
            </Link>
          </List>
        </Card>
      </Drawer>
    </>
  );
}
