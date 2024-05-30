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
import { googleAuthentication, signin } from "../../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Title from "../../Title";
import { Loader } from "../../Components/Loader";

export function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated, success, loading, user } = useSelector(
    (state) => state.user
  );
  // console.log(user);
  const onSubmit = (data) => {
    dispatch(signin(data.email, data.username, data.password));
  };
  const handleLogin = () => {
    // Redirect the user to the Google OAuth 2.0 endpoint on the backend
    // window.location.href = 'http://localhost:5173/auth/google';
    dispatch(googleAuthentication());
  };

  useEffect(() => {
    if (isAuthenticated) {
      const lastVisitedUrl = sessionStorage.getItem("lastVisitedUrl");
      if (lastVisitedUrl) {
        navigate(lastVisitedUrl);
      } else {
        navigate(`/channel/${user?.username}`);
      }
    }
    if (success) {
      navigate(`/channel/${user?.username}`);
    }
    if (error) {
      toast.error(error);
    }
  }, [navigate, success, isAuthenticated, error]);

  return (
    <Card className="w-96  mx-auto mt-36">
      <Title title="Sign in" />
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            {...register("email", {
              required: "Email is required",
            })}
            size="lg"
          />
          {errors.email && (
            <p className="my-2 text-red-600">{errors.email.message}</p>
          )}
          <Input
            label="Username"
            {...register("username", {
              required: "Username is required",
            })}
            size="lg"
          />
          {errors.username && (
            <p className="my-2 text-red-600">{errors.username.message}</p>
          )}
          <Input
            label="Password"
            {...register("password", {
              required: "Password is required",
            })}
            size="lg"
          />
          {errors.password && (
            <p className="my-2 text-red-600">{errors.password.message}</p>
          )}
          <div className="flex justify-between">
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
            <div className="-ml-2.5 ">
              <Link to="/forget-password">
                <p>Forget Password ?</p>
              </Link>
            </div>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" type="submit" fullWidth>
            Sign In
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="gradient"
            // color="blue-gray"
            className="flex items-center gap-8 mt-2"
            onClick={handleLogin}
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-6 w-6"
            />
            Continue with Google
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
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
