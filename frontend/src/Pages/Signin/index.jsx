import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Title from "../../Title";
import {
  signinUserRequest,
  signinUserSuccess,
  signinUserFailure,
} from "../../Slices/UserSlices";
import axios from "axios";
import { extractErrorMessage } from "../../extractErrorMessage";

export function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, currentUser } = useSelector((state) => state.user);

  const onSubmit = async (data) => {
    const userData = {
      email: data.email,
      username: data.username,
      password: data.password,
    };
    try {
      dispatch(signinUserRequest());
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`,
          userData,
          config
        );
        dispatch(signinUserSuccess(res.data.data?.user));
      } else {
        const res = await axios.post(`/api/v1/users/login`, userData, config);
        dispatch(signinUserSuccess(res.data.data?.user));
      }
      if (success) {
        navigate(`/channel/${currentUser?.username}`);
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(signinUserFailure(errorMessage || error.message));
    }
  };

  const handleLogin = () => {
    // dispatch(googleAuthentication()).catch((error) =>
    //   console.error("Error during Google authentication:", error)
    // );
  };

  useEffect(() => {
    if (success) {
      const lastVisitedUrl = sessionStorage.getItem("lastVisitedUrl");
      // console.log(lastVisitedUrl)
      if (lastVisitedUrl !== "/signin") {
        navigate(lastVisitedUrl);
      } else {
        navigate(`/channel/${currentUser?.username}`);
      }
    }
    if (error) {
      toast.error(
        error.includes("User does not exist")
          ? "Error: Invalid credentials"
          : error
      );
    }
  }, [navigate, toast, success, error]);

  return (
    <Card className="w-96 mx-auto mt-36">
      <Title title="Sign in" />
      <CardHeader className="mb-4 grid h-28 place-items-center bg-primarybg">
        <Typography variant="h3" color="white" className="font-quicksand">
          Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <Input
            color="blue-gray"
            label="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="my-2 text-red-600">{errors.email.message}</p>
          )}
          <Input
            color="blue-gray"
            label="Username"
            {...register("username", { required: "Username is required" })}
            size="lg"
          />
          {errors.username && (
            <p className="my-2 text-red-600">{errors.username.message}</p>
          )}
          <Input
            type="password"
            color="blue-gray"
            label="Password"
            {...register("password", { required: "Password is required" })}
            size="lg"
          />
          <Typography
            variant="small"
            className="mt-2 flex items-center gap-1 font-normal text-primarybg"
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
          {errors.password && (
            <p className="my-2 text-red-600">{errors.password.message}</p>
          )}
          <div className="flex justify-between ">
            <div className="-ml-2.5">
              <Checkbox
                label="Remember Me"
                className="checked:border-primarybg text-primarybg checked:bg-primarybg"
              />
            </div>
            <div className="-ml-2.5 text-primarybg ">
              <Link to="/forget-password">
                <p>Forget Password?</p>
              </Link>
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            className="bg-primarybg font-quicksand text-xl"
            type="submit"
            fullWidth
            disabled={isSubmitting ? true : false}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <Button
            fullWidth
            size="lg"
            className="flex items-center gap-8 mt-2 bg-primarybg font-quicksand text-md"
            onClick={handleLogin}
            disabled={isSubmitting ? true : false}
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="Google"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>
          <Typography
            variant="small"
            className="mt-6 flex justify-center text-primarybg"
          >
            Don&apos;t have an account?
            <Link to="/signup" className="ml-1 font-bold">
              Sign up
            </Link>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
}
