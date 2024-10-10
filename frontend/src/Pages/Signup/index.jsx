import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Title from "../../lib/Title";
import { toast } from "react-toastify";
import {
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,
} from "../../redux/Slices/UserSlices";
import { extractErrorMessage } from "../../lib/extractErrorMessage";
import axios from "axios";
import { Typography } from "@material-tailwind/react";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  //handling the submission of the form

  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.set("fullname", data.fullname);
    myForm.set("email", data.email);
    myForm.set("username", data.username);
    myForm.set("password", data.password);

    // Assuming `data.avatar` and `data.coverImage` are FileLists or arrays
    if (data.avatar && data.avatar[0]) {
      myForm.set("avatar", data.avatar[0]);
    }
    if (data.coverImage && data.coverImage[0]) {
      myForm.set("coverImage", data.coverImage[0]);
    }

    try {
      dispatch(registerUserRequest());
      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };

      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`,
          myForm,
          config
        );
        dispatch(registerUserSuccess(res.data));
      } else {
        const res = await axios.post(`/api/v1/users/register`, myForm, config);
        dispatch(registerUserSuccess(res.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(registerUserFailure(errorMessage || error.message));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      reset();
      toast.success("User Successfully Singed In");
      navigate("/signin");
    }
  }, [success, navigate, error]);
  return (
    <div className="mt-28 flex flex-col text-primarybg  bg-transparent shadow-none rounded-xl bg-clip-border items-center justify-center">
      <Title title="Sign up" />
      <h4 className="block  text-2xl antialiased font-semibold leading-snug tracking-normal text-primarybg font-quicksand">
        Sign Up
      </h4>
      <p className="block mt-1  text-base antialiased font-normal leading-relaxed text-secondarybg">
        Nice to meet you! Enter your details to register.
      </p>
      <form
        className="max-w-screen-lg mt-8 mb-2 w-80 sm:w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6 mb-1">
          <h6 className="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-primarybg">
            Name*
          </h6>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              placeholder="Your Name"
              {...register("fullname", {
                required: "Fullname is required",
                minLength: "5",
                maxLength: "20",
              })}
              className="peer h-full w-full rounded-md border border-secondarybg border-t-transparent !border-t-secondarybg bg-transparent px-3 py-3  text-sm  text-secondarybg outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-secondarybg placeholder-shown:border-t-secondarybg focus:border-2 focus:border-secondarybg focus:border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            {errors.fullname && (
              <p className="my-2 text-red-600">{errors.fullname.message}</p>
            )}
          </div>
          <h6 className="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-primarybg">
            Username*
          </h6>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              placeholder="Your Username"
              {...register("username", {
                required: "Username is required",
                minLength: "5",
                maxLength: "20",
              })}
              className="peer h-full w-full rounded-md border border-secondarybg border-t-transparent !border-t-secondarybg bg-transparent px-3 py-3  text-sm  text-secondarybg outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-secondarybg placeholder-shown:border-t-secondarybg focus:border-2 focus:border-secondarybg focus:border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            {errors.username && (
              <p className="my-2 text-red-600">{errors.username.message}</p>
            )}
          </div>

          <h6 className="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-primarybg">
            Email*
          </h6>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              placeholder="name@mail.com"
              {...register("email", {
                required: "Email is required",
                pattern: "_%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/,",
              })}
              className="peer h-full w-full rounded-md border border-secondarybg border-t-transparent !border-t-secondarybg bg-transparent px-3 py-3  text-sm  text-secondarybg outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-secondarybg placeholder-shown:border-t-secondarybg focus:border-2 focus:border-secondarybg focus:border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />{" "}
            {errors.email && (
              <p className="my-2 text-red-600">{errors.email.message}</p>
            )}
          </div>
          <h6 className="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-primarybg">
            Password*
          </h6>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              type="password"
              placeholder="********"
              {...register("password", {
                required: "Password is required",
                minLength: "6",
                maxLength: "30",
              })}
              className="peer h-full w-full rounded-md border border-secondarybg border-t-transparent !border-t-secondarybg bg-transparent px-3 py-3  text-sm  text-secondarybg outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-secondarybg placeholder-shown:border-t-secondarybg focus:border-2 focus:border-secondarybg focus:border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            {errors.password && (
              <p className="my-2 text-red-600">{errors.password.message}</p>
            )}
          </div>
          <Typography
            variant="small"
            className="mt-1 flex items-center gap-1 font-normal text-primarybg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="-mt-px h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
            Use at least 8 characters, one uppercase, one lowercase, and one
            number.
          </Typography>

          <h6 className="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-primarybg">
            Avatar*
          </h6>
          <div className="relative h-11 w-full min-w-[200px] mb-6">
            <input
              type="file"
              {...register("avatar", {
                required: "Avatar is required",
              })}
              accept="image/*"
              className="block w-full border peer border-secondarybg  shadow-sm rounded-lg text-sm focus:border-2 focus:border-secondarybg focus:border-t-transparent focus:!border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 disabled:opacity-50 disabled:pointer-events-none  file:border-0 file:me-4 file:py-3 file:px-4  dark:file:bg-neutral-700 dark:file:text-neutral-400"
            />
            {errors.avatar && (
              <p className="my-2 text-red-600">{errors.avatar.message}</p>
            )}
          </div>

          <h6 className="block -mb-3  text-base antialiased font-semibold leading-relaxed tracking-normal text-primarybg">
            Cover Image
          </h6>
          <div className="relative h-11 w-full min-w-[200px] mb-6">
            <input
              type="file"
              {...register("coverImage", {
                required: false,
              })}
              accept="image/*"
              className="block w-full border peer border-secondarybg  shadow-sm rounded-lg text-sm focus:border-2 focus:border-secondarybg focus:border-t-transparent focus:!border-t-secondarybg focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 disabled:opacity-50 disabled:pointer-events-none  file:border-0 file:me-4 file:py-3 file:px-4  dark:file:bg-neutral-700 dark:file:text-neutral-400"
            />
          </div>
        </div>

        <div className="inline-flex items-center">
          <label
            className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
            htmlFor="remember"
          >
            <input
              type="checkbox"
              {...register("checkbox", {
                required: "Check the Terms & Conditions",
              })}
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-secondarybg transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-primarybg before:opacity-0 before:transition-opacity checked:border-primarybg checked:bg-primarybg checked:before:bg-primarybg hover:before:opacity-10"
              id="remember"
            />

            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </label>
          <label
            className="mt-px font-light text-gray-700 cursor-pointer select-none"
            htmlFor="remember"
          >
            <p className="flex items-center  text-sm antialiased font-normal leading-normal text-primarybg">
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-secondarybg"
              >
                &nbsp;Terms and Conditions
              </a>
            </p>
          </label>
        </div>
        {errors.checkbox && (
          <p className=" text-red-600">{errors.checkbox.message}</p>
        )}
        <button
          className="mt-6 block w-full select-none rounded-lg bg-primarybg py-3 px-6 text-center align-middle  text-md font-quicksand font-semibold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
          disabled={isSubmitting}
        >
          sign up
        </button>
        <p className="block mt-4  text-base antialiased font-normal leading-relaxed text-center text-secondarybg">
          Already have an account?
          <Link to="/signin" className="font-medium text-primarybg">
            {" "}
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};
