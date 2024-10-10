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
import {
  MdKeyboardArrowRight,
  MdWatchLater,
  MdPlaylistAddCheckCircle,
} from "react-icons/md";
import { RiChatHistoryFill } from "react-icons/ri";
import { BiSolidLike } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [drawerOpen, setdrawerOpen] = React.useState(false);
  const openDrawer = () => setdrawerOpen(true);
  const closeDrawer = () => setdrawerOpen(false);

  const handleDrawer = () => {
    setdrawerOpen((prev) => !prev);
  };
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      {" "}
      <Button
        className="bg-transparent text-[#55567e] shadow-none "
        onClick={handleDrawer}
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
        className="mt-20 w-auto  rounded-none b-0 h-[100vh] bg-transparent"
      >
        <Card className="h-[100vh] bg-primarybg/60 ">
          <List className=" font-bold h-full text-primaryTxt  ">
            <Link to="/" onClick={handleDrawer}>
              <ListItem className="p-0 " selected={open === 2}>
                <ListItemPrefix className="border-b-0 p-3">
                  <IoMdHome className="h-6 w-6" />
                </ListItemPrefix>
                <Typography className="mr-auto font-quicksand font-bold text-md">
                  Home
                </Typography>
              </ListItem>
            </Link>
            <Link
              to={`/subscriber/${currentUser?.username}`}
              onClick={handleDrawer}
            >
              <ListItem className="p-0" selected={open === 2}>
                <ListItemPrefix className="border-b-0 p-3">
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography className="mr-auto font-quicksand font-bold text-md">
                  Subscriber
                </Typography>
              </ListItem>
            </Link>
            <Link
              to={`/subscribed-channel/${currentUser?.username}`}
              onClick={handleDrawer}
            >
              <ListItem className="p-0" selected={open === 2}>
                <ListItemPrefix className="border-b-0 p-3">
                  <ShoppingBagIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography className="mr-auto font-quicksand font-bold text-md">
                  Subscribed <br /> Channels
                </Typography>
              </ListItem>
            </Link>
            <hr className="my-1 w-52 border-blue-gray-400" />
            <ListItem className="hover:bg-none ">
              You <MdKeyboardArrowRight className="h-6 w-6" />
            </ListItem>
            <Link
              to={`channel/${currentUser?.username}`}
              onClick={handleDrawer}
            >
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Your Channel
              </ListItem>
            </Link>
            <Link to="/user/history" onClick={handleDrawer}>
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <RiChatHistoryFill className="h-5 w-5" />
                </ListItemPrefix>
                History
              </ListItem>
            </Link>
            <Link to="/playlists" onClick={handleDrawer}>
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <MdPlaylistAddCheckCircle className="h-5 w-5" />
                </ListItemPrefix>
                Playlists
              </ListItem>
            </Link>
            <Link to="/watch-later" onClick={handleDrawer}>
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <MdWatchLater className="h-5 w-5" />
                </ListItemPrefix>
                Watch later
              </ListItem>
            </Link>
            <Link to="/liked-videos" onClick={handleDrawer}>
              <ListItem className="font-quicksand text-md">
                <ListItemPrefix>
                  <BiSolidLike className="h-5 w-5" />
                </ListItemPrefix>
                Liked Videos
              </ListItem>
            </Link>
            <Link to="/settings" onClick={handleDrawer}>
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
