import React, { useEffect } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Title from "../../lib/Title";
import {
  forgetPasswordRequest,
  forgetPasswordSuccess,
  forgetPasswordFailure,
} from "../../redux/Slices/UserSlices";
import axios from "axios";
import { extractErrorMessage } from "../../lib/extractErrorMessage";

export const ForgetPassword = () => {
  const dispatch = useDispatch();
  const { error, success, message } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.set("email", data.email);
    try {
      dispatch(forgetPasswordRequest());
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}api/v1/users/forget-password`,
          myForm,
          config
        );
        dispatch(forgetPasswordSuccess(res.data));
      } else {
        let res = await axios.post(
          `api/v1/users/forget-password`,
          myForm,
          config
        );
        dispatch(forgetPasswordSuccess(res.data));
      }
      reset();
    } catch (error) {
      let errorMessage = extractErrorMessage(error.response?.data);
      dispatch(forgetPasswordFailure(errorMessage || error.message));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(message);
    }
  }, [toast, error, success, message]);
  return (
    <Card className="w-96 mx-auto  mt-24">
      <Title title="Forget Password" />
      <div className="flex flex-col items-center justify-center w-full p-[29px] border-blue_gray-100_01 border border-solid bg-white-A700 rounded-[10px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-start w-full gap-[31px] my-[9px]">
            <div className="flex flex-row justify-center w-full">
              <div className="flex flex-col items-center justify-start w-full gap-[22px]">
                <div className="flex flex-col items-center justify-start w-full gap-2">
                  <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-2xl text-primarybg font-bold mb-4 tracking-[-0.72px]">
                      Reset Password
                    </p>
                  </div>
                  <p as="p" className="text-primarybg font-thin font-quicksand">
                    Enter the email address associated with your account and
                    we&#39;ll send you a link to reset your password.
                  </p>
                </div>
                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  name="email"
                  placeholder="email address"
                  label="Email"
                  prefix='{<Img src="images/img_icon_24px_email.svg" alt="icon / 24px / email" />}'
                  className="w-full gap-3.5 font-semibold border-secondarybg border border-solid active:border-secondarybg  "
                />
                {errors.email && (
                  <p className="my-2 text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-[18px]">
              <Button
                type="submit"
                className="w-full bg-secondarybg font-quicksand text-md"
                disabled={isSubmitting ? true : false}
              >
                {isSubmitting ? "Sending..." : "Send"}
              </Button>
              <Link to="/signin">
                <p
                  color="white_A700"
                  size="2xl"
                  className="w-full text-primarybg font-bold border-gray-600_02"
                >
                  Return to sign in
                </p>
              </Link>
            </div>
            <div className="h-px w-full bg-blue_gray-100_01" />
            <div className="flex flex-row justify-center w-full gap-2">
              <Typography
                size="lg"
                as="h2"
                className="!text-gray-600_02 tracking-[-0.40px] text-center"
              >
                Don’t have an account?
              </Typography>

              <Link to="/signup">
                <Typography
                  size="lg"
                  as="h3"
                  className="text-primarybg tracking-[-0.40px] font-bold  "
                >
                  Create Account
                </Typography>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};
