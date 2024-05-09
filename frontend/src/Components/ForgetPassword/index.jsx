import React, { useEffect } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { forgetPassword } from "../../actions/UserAction";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export const ForgetPassword = () => {
  const dispatch = useDispatch();
  const {loading, error, success, message} = useSelector((state)=> state.forgetPassword)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const myForm = new FormData();
    // console.log(data.email)
    myForm.set('email', data.email);
    dispatch(forgetPassword(myForm));
  };

  useEffect(() => {

    if(error){
      toast.error(error)
    }
    if(success){
      toast.success(message)
    }
    
  }, [toast, error, success, message]);
  return (
    <Card className="w-96 mx-auto  mt-24">
      <div className="flex flex-col items-center justify-center w-full p-[29px] border-blue_gray-100_01 border border-solid bg-white-A700 rounded-[10px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-start w-full gap-[31px] my-[9px]">
            <div className="flex flex-row justify-center w-full">
              <div className="flex flex-col items-center justify-start w-full gap-[22px]">
                <div className="flex flex-col items-center justify-start w-full gap-2">
                  <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-2xl mb-4 tracking-[-0.72px]">
                      Reset Password
                    </p>
                  </div>
                  <p as="p" className="!text-gray-900">
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
                  className="w-full gap-3.5 font-semibold border-blue_gray-100_01 border border-solid"
                />
                {errors.email && (
                  <p className="my-2 text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center justify-start w-full gap-[18px]">
              <Button type="submit" className="w-full font-bold">
                Send
              </Button>
              <Link to="/signin">
                <p
                  color="white_A700"
                  size="2xl"
                  className="w-full text-gray-900 font-bold border-gray-600_02"
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
                <Typography size="lg" as="h3" className="tracking-[-0.40px]">
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
