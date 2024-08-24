import React, { useEffect } from "react";
// import { Heading, Button, Input, Img, Text } from "../../components";
// import { default as ModalProvider } from "react-modal";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../../Title";
import {
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "../../Slices/UserSlices";
import { extractErrorMessage } from "../../extractErrorMessage";
import axios from "axios";

export const ForgetNewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, message } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.set("password", data.password);
    myForm.set("confirmPassword", data.confirmpassword);
    try {
      dispatch(resetPasswordRequest());
      const config = { headers: { "Content-Type": "application/json" },  withCredentials: true };

      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.put(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/users/forget-password/${token}`,
          myForm,
          config
        );
        dispatch(resetPasswordSuccess(res.data));
      } else {
        const res = await axios.put(
          `/api/v1/users/forget-password/${token}`,
          myForm,
          config
        );
        dispatch(resetPasswordSuccess(res.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(resetPasswordFailure(errorMessage || error.message));
      // console.log(errorMessage);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Password Changed Successfully");
      navigate("/signin");
    }
  }, [toast, error, success, message]);

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
                  <Typography className="text-2xl tracking-[-0.72px]">
                    New Password
                  </Typography>
                </div>
                <p className="!text-gray-900">Enter your new password</p>
              </div>
              <Input
                type="password"
                name="newpassword"
                placeholder="Password"
                label="Password"
                className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="my-2 text-red-600">{errors.password.message}</p>
              )}
              <Input
                type="password"
                name="newpassword"
                label="Confirm Password"
                placeholder="Re-New Password"
                className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid"
                {...register("confirmpassword", {
                  required: "Confirm Password is required",
                })}
              />
              {errors.confirmpassword && (
                <p className="my-2 text-red-600">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full text-white bg-primarybg font-bold"
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? "Updating" : "Update Password"}
          </Button>
        </form>
      </div>
    </Card>
  );
};
