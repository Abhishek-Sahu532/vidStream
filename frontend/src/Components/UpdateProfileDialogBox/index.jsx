import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";


export const UpdateProfileDialogBox = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
    >
      <DialogHeader className="" onClick={handleClose}>
        <IoMdClose />
      </DialogHeader>
      <DialogBody className="flex flex-col gap-4">
        <Link to="/update-userprofile">
          <Button
            fullWidth
            variant="outlined"
            className="font-quicksand text-primarybg font-bold text-sm border border-primarybg"
          >
            Update Name and Email
          </Button>
        </Link>
        <Link to="/update-avatar">
          <Button
            fullWidth
            variant="outlined"
            className="font-quicksand text-primarybg font-bold text-sm border border-primarybg"
          >
            Update Avatar
          </Button>
        </Link>

        <Link to="/update-cover-image">
          <Button
            fullWidth
            variant="outlined"
            className="font-quicksand text-primarybg font-bold text-sm border border-primarybg"
          >
            Update Cover Image
          </Button>
        </Link>

        <Link to="/reset-password">
          <Button
            fullWidth
            variant="outlined"
            className="font-quicksand text-primarybg font-bold text-sm border border-primarybg"
          >
            Update Password
          </Button>
        </Link>
      </DialogBody>
    </Dialog>
  );
};
