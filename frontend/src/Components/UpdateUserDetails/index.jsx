import React, { useEffect, useState } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Title from "../../Title";
import { updateUserDetails } from "../../actions/UserAction";

export const UpdateUserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, success, loading } = useSelector((state) => state.updateUserDetails);
  const [username, setUsername] = useState(user.username);
  const [fullname, setFullname] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  console.log({ username, fullname, email });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    dispatch(updateUserDetails({ username, fullname, email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Details Changed Successfully");
      navigate(`/channel/${user?.username}`);
    }
  }, [toast, error, success]);

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
          >
          {loading ? 'Updating...' : 'Update Details'} 
          </Button>
        </form>
      </div>
    </Card>
  );
};
