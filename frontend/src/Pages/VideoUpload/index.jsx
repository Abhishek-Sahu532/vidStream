import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import HoverVideoPlayer from "react-hover-video-player";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../../lib/Title";
import {
  videoUploadRequest,
  videoUploadSuccess,
  videoUploadFailure,
} from "../../redux/Slices/VideoSlices";
import { extractErrorMessage } from "../../lib/extractErrorMessage";
import axios from "axios";

export function VideoUpload() {
  const { success, loading, error } = useSelector((state) => state.videos);
  const { currentUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [video, setVideo] = useState("");
  const [thumbanail, setThumbnail] = useState(null);
  const dispatch = useDispatch();

  const changeVideoPreview = () => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
    } else {
      toast.error("Please select a valid video file.");
    }
  };

  const changeImagePreview = () => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const imgUrl = URL.createObjectURL(file);
      setThumbnail(imgUrl);
    } else {
      // Handle error: File type is not supported
      toast.error("Please select a valid image file.");
    }
  };

  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.set("title", data.title);
    myForm.set("description", data.description);

    if (data.video && data.video[0]) {
      myForm.set("videoFile", data.video[0]);
    }
    if (data.thumbnail && data.thumbnail[0]) {
      myForm.set("thumbnail", data.thumbnail[0]);
    }

    try {
      dispatch(videoUploadRequest());
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      };
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/video/publish-a-video`,
          myForm,
          config
        );
        dispatch(videoUploadSuccess(res.data));
      } else {
        const res = await axios.post(
          "/api/v1/video/publish-a-video",
          myForm,
          config
        );
        dispatch(videoUploadSuccess(res.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(videoUploadFailure(errorMessage || error.message));
    }
  };
  useEffect(() => {
    if (success) {
      toast.success(success);
      navigate(`/channel/${currentUser?.username}`);
    }
    if (error) {
      toast.error(error);
    }
  }, [success, toast, navigate, error]);
  return (
    <Card color="transparent" shadow={false} className="pt-28 px-16 b">
      <Title title="Upload A Video" />
      <Typography variant="h4" className="text-white/80">
        Upload a Video
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-white/60">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2  max-w-screen-lg  flex flex-col "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Typography
            variant="h6"
            className="mb-3 text-white/90 text-xl font-bold  font-quicksand"
          >
            SELECT A VIDEO
          </Typography>

          <div className="flex flex-row gap-6 justify-center align-middle">
            <div className="border-primarybg rounded-lg focus:!border-gray-900 border border-solid w-[300px]">
              <input
                type="file"
                name="fileForVideo"
                id="fileForVideo"
                className="sr-only"
                {...register("video", {
                  required: "Video is required",
                })}
                onChange={changeVideoPreview}
                accept="video/mp4, video/*"
              />
              <label
                htmlFor="fileForVideo"
                className="relative flex min-h-[200px] items-center justify-center rounded-md  p-12 text-center"
              >
                <div className="  !border-t-blue-gray-200 focus:!border-t-gray-900">
                  <span className="mb-2 block text-xl font-semibold text-primarybg">
                    Drop file here
                  </span>
                  <span className="mb-2 block text-base font-medium text-primarybg">
                    Or
                  </span>
                  <span className="inline-flex rounded-full border border-primarybg py-2 px-7 text-base font-medium text-[#07074D]">
                    Browse
                  </span>
                </div>
              </label>
            </div>

            <div className="ml-8 w-[50%] rounded-md">
              <HoverVideoPlayer
                className="rounded-md"
                videoSrc={video}
                loadingOverlay={
                  <div className="loading-overlay">
                    <div className="loading-spinner" />
                  </div>
                }
              />{" "}
            </div>
          </div>
          {errors.video && (
            <p className="my-2 text-red-600">{errors.video.message}</p>
          )}
        </div>

        <div className="mt-5">
          <Typography
            variant="h6"
            className="mb-3 font-quicksand text-white/90 text-xl"
          >
            Select a Thumbnail
          </Typography>

          <div className="flex flex-row gap-6 justify-center align-middle">
            <div className="!border-primarybg rounded-md focus:!border-gray-900 border border-solid w-[300px]">
              <input
                type="file"
                name="fileForThumbnail"
                id="fileForThumbnail"
                className="sr-only"
                {...register("thumbnail", {
                  required: "Thumbnail is required",
                })}
                accept="image/*"
                onChange={changeImagePreview}
              />
              <label
                htmlFor="fileForThumbnail"
                className="relative flex min-h-[200px] items-center justify-center rounded-md  p-12 text-center"
              >
                <div className="  !border-t-blue-gray-200 focus:!border-t-gray-900">
                  <span className="mb-2 block text-xl font-semibold text-primarybg ">
                    Drop file here
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span className="inline-flex  border border-primarybg py-2 px-7 text-base font-medium text-primarybg rounded-full">
                    Browse
                  </span>
                </div>
              </label>
            </div>
            <div className="ml-8 w-[50%] rounded-md">
              {thumbanail && (
                <div>
                  <img
                    className="h-60 w-80 border object-cover rounded-sm "
                    src={thumbanail}
                    alt="Selected Thumbnail Photo"
                  />
                </div>
              )}
            </div>
          </div>
          {errors.thumbnail && (
            <p className="my-2 text-red-600">{errors.thumbnail.message}</p>
          )}
        </div>

        <div className="flex flex-row gap-6 justify-center align-middle mt-5">
          <Typography variant="h6" className="text-center text-white/90 text-xl">
            Title
          </Typography>
          <Input
            {...register("title", {
              required: "Title is required",
              minLength: "5",
            })}
            size="lg"
            placeholder="Title of the video"
            className=" !border-t-blue-gray-200 focus:!border-t-primarybg"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        {errors.title && (
          <p className="my-2 text-red-600">{errors.title.message}</p>
        )}
        <div className="mt-8">
          <Typography variant="h6" className="mb-3 text-white/90 text-xl">
            Description
          </Typography>

          <Textarea
            {...register("description", {
              required: "Description is required",
              minLength: "5",
            })}
            size="lg"
            placeholder="Description"
            className=" !border-t-blue-gray-200 focus:!border-primarybg"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          ></Textarea>
        </div>
        {errors.description && (
          <p className="my-2 text-red-600">{errors.description.message}</p>
        )}
        <Checkbox
          className=""
          color="indigo"
          {...register("checkbox", {
            required: "Please check the Terms & Conditions",
          })}
          label={
            <Typography
              variant="small"
              className="flex items-center text-white/90 text-sm font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:primarybg"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        {errors.checkbox && (
          <p className="my-2 text-red-600">{errors.checkbox.message}</p>
        )}
        <Button
          className="mt-6 bg-primarybg font-quicksand text-lg"
          fullWidth
          type="submit"
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </Card>
  );
}
