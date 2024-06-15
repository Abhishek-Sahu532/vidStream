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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadAVideo } from "../../actions/VideoAction";
import { useNavigate } from "react-router-dom";
import Title from "../../Title";

import { useSelector } from "react-redux";

export function VideoUpload() {

const { success, loading, error} = useSelector((state)=> state.video )
const { user} = useSelector((state)=> state.user )
console.log( success, loading, error)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate = useNavigate();

  const [video, setVideo] = useState("");
  const [thumbanail, setThumbnail] = useState("");

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

  const onSubmit =  (data) => {
    const myForm = new FormData();
    myForm.set("videoFile", data.video[0]);
    myForm.set("thumbnail", data.thumbnail[0]);
    myForm.set("title", data.title);
    myForm.set("description", data.description);

     dispatch(uploadAVideo(myForm));
    // navigate('/my-profile')
    // console.log(myForm); 
  };

  useEffect(() => {
if(success){
  toast.success(success)
 navigate(`/channel/${user?.username}`)
}
if(error){
  toast.error(error)
}

  }, [success, toast, navigate, error]);

  return (
    <Card color="transparent" shadow={false} className="mt-28 px-16 b">
    <Title title='Upload A Video' />
      <Typography variant="h4" color="blue-gray">
        Upload a Video
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form
        className="mt-8 mb-2  max-w-screen-lg  flex flex-col "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Select a Video
          </Typography>

          <div className="flex flex-row gap-6 justify-center align-middle">
            <div className="!border-blue-gray-200 focus:!border-gray-900 border border-solid w-[300px]">
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
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Drop file here
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
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
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Select a Thumbnail
          </Typography>

          <div className="flex flex-row gap-6 justify-center align-middle">
            <div className="!border-blue-gray-200 focus:!border-gray-900 border border-solid w-[300px]">
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
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Drop file here
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                    Browse
                  </span>
                </div>
              </label>
            </div>

            <div className="ml-8 w-[50%] rounded-md">
              <img
                className="h-60 w-80 border object-cover rounded-sm "
                src={thumbanail}
                alt="Selected Thumbnail Photo"
              />
            </div>
          </div>
          {errors.thumbnail && (
            <p className="my-2 text-red-600">{errors.thumbnail.message}</p>
          )}
        </div>

        <div className="flex flex-row gap-6 justify-center align-middle mt-5">
          <Typography variant="h6" color="blue-gray" className="text-center ">
            Title
          </Typography>
          <Input
            {...register("title", {
              required: "Title is required",
              minLength: "5",
            })}
            size="lg"
            placeholder="Title of the video"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        {errors.title && (
          <p className="my-2 text-red-600">{errors.title.message}</p>
        )}
        <div className="mt-8">
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Description
          </Typography>

          <Textarea
            {...register("description", {
              required: "Description is required",
              minLength: "5",
            })}
            size="lg"
            placeholder="Description"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          ></Textarea>
        </div>
        {errors.description && (
          <p className="my-2 text-red-600">{errors.description.message}</p>
        )}
        <Checkbox
          {...register("checkbox", {
            required: "Please check the Terms & Conditions",
          })}
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
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
        <Button className="mt-6" fullWidth type="submit">
         { loading ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </Card>
  );
}
