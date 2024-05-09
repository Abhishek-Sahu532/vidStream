import React, { useEffect } from "react";
// import { Heading, Button, Input, Img, Text } from "../../components";
// import { default as ModalProvider } from "react-modal";

import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../actions/UserAction";
import { useParams } from "react-router-dom";

export const ForgetNewPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector(
    (state) => state.forgetPassword
  );
  const token = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const myForm = new FormData();
    // console.log(data.email)
    myForm.set("password", data.password);
    myForm.set("confirmPassword", data.confirmpassword);
    // dispatch(forgetPassword(myForm));
    dispatch(resetPassword(token, myForm))
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
                <p className="my-2 text-red-600">{errors.confirmpassword.message}</p>
              )}
            </div>
          </div>
          <Button type="submit" className="w-full font-bold">
            Update Password
          </Button>
        </form>
      </div>
    </Card>
  );
};
