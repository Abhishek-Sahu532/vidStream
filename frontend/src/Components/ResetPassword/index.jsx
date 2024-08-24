import React, { useEffect } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Title from "../../Title";
import {
  resetPasswordForLoggedInUserRequest,
  resetPasswordForLoggedInUserSuccess,
  resetPasswordForLoggedInUserFailure,
} from "../../Slices/UserSlices";
import { extractErrorMessage } from "../../extractErrorMessage";
import axios from "axios";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error2, success2 } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  console.log(error2);
  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.set("oldPassword", data.oldPassword);
    myForm.set("newPassword", data.newPassword);
    myForm.set("confirmNewPassword", data.confirmNewPassword);

    try {
      dispatch(resetPasswordForLoggedInUserRequest());
      const config = { headers: { "Content-Type": "application/json" } };
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/reset-password`,
          myForm,
          config
        );
        dispatch(resetPasswordForLoggedInUserSuccess(res.data));
      } else {
        const res = await axios.put(
          `/api/v1/users/reset-password`,
          myForm,
          config
        );
        dispatch(resetPasswordForLoggedInUserSuccess(res.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(
        resetPasswordForLoggedInUserFailure(errorMessage || error.message)
      );
    }
  };

  useEffect(() => {
    if (error2) {
      toast.error(error2);
    }
    if (success2) {
      toast.success("Password Changed Successfully");
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
                    Reset Password
                  </Typography>
                </div>
                <p className=" text-primarybg font-semibold font-quicksand ">
                  Enter your new password
                </p>
              </div>
              <Input
                type="password"
                color="blue-gray"
                name="oldPassword"
                placeholder="Old Password"
                label="oldPassword"
                className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid"
                {...register("oldPassword", {
                  required: "Old Password is required",
                })}
              />
              {errors.oldPassword && (
                <p className="my-2 text-red-600">
                  {errors.oldPassword.message}
                </p>
              )}
              <Input
                type="password"
                color="blue-gray"
                name="newPassword"
                placeholder="New Password"
                label="newPassword"
                className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid"
                {...register("newPassword", {
                  required: "New Password is required",
                })}
              />
              {errors.newPassword && (
                <p className=" text-red-600">{errors.newPassword.message}</p>
              )}
              <Input
                type="password"
                color="blue-gray"
                name="confirmNewPassword"
                label="Confirm Password"
                placeholder="Re-New Password"
                className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid"
                {...register("confirmNewPassword", {
                  required: "Confirm Password is required",
                })}
              />
              {errors.confirmNewPassword && (
                <p className="my-2 text-red-600">
                  {errors.confirmNewPassword.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-primarybg font-quicksand text-md font-bold"
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </Card>
  );
};
