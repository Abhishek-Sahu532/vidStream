import React, { useEffect, useState } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Title from "../../lib/Title";
import {
  updateUserDetailsRequest,
  updateUserDetailsSuccess,
  updateUserDetailsFailure,
} from "../../redux/Slices/UserSlices";
import axios from "axios";
import { extractErrorMessage } from "../../lib/extractErrorMessage";

export const UpdateUserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, error2, success2 } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser.username);
  const [fullname, setFullname] = useState(currentUser.fullname);
  const [email, setEmail] = useState(currentUser.email);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async () => {
    // dispatch(updateUserDetails({ username, fullname, email }));
    try {
      dispatch(updateUserDetailsRequest());
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };

      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-account`,
          { username, fullname, email },
          config
        );
        dispatch(updateUserDetailsSuccess(res.data));
      } else {
        const res = await axios.patch(
          `/api/v1/users/update-account`,
          { username, fullname, email },
          config
        );
        dispatch(updateUserDetailsSuccess(res.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(updateUserDetailsFailure(errorMessage || error.message));
    }
  };

  useEffect(() => {
    if (error2) {
      toast.error(error2);
    }
    if (success2) {
      toast.success("Details Changed Successfully");
      navigate(`/channel/${currentUser?.username}`);
    }
  }, [toast, error2, success2]);
  return (
    <Card className="w-96 mx-auto  mt-24">
      <Title title="Reset Password" />
      <div className="flex flex-col items-center justify-center w-full p-[29px] border-blue_gray-100_01 border border-solid bg-white-A700 rounded-[10px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-start w-full mt-2.5 mb-[7px] gap-[31px]"
        >
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col items-center justify-start w-full gap-6">
              <div className="flex flex-col items-start justify-start w-full gap-3.5">
                <div className="flex flex-row justify-between items-center w-full">
                  <Typography className="text-2xl font-quicksand tracking-[-0.72px] text-primarybg font-semibold">
                    Update Details
                  </Typography>
                </div>
                <p className=" text-primarybg font-semibold font-quicksand ">
                  Please fill the details to update
                </p>
              </div>
              <Input
                color="blue-gray"
                value={username}
                label="Username"
                {...register("username", {
                  required: false,
                })}
                onChange={(e) => setUsername(e.target.value)}
              />{" "}
              <Input
                color="blue-gray"
                label="Name"
                value={fullname}
                {...register("fullname", {
                  required: false,
                })}
                onChange={(e) => setFullname(e.target.value)}
              />{" "}
              <Input
                color="blue-gray"
                label="Email"
                value={email}
                {...register("email", {
                  required: false,
                })}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              {errors.email && (
                <p className="my-2 text-red-600">{errors.email.message}</p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primarybg font-quicksand text-md font-bold"
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? "Updating..." : "Update Details"}
          </Button>
        </form>
      </div>
    </Card>
  );
};
