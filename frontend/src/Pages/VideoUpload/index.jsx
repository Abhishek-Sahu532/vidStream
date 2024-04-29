import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

import HoverVideoPlayer from "react-hover-video-player";
import videoFile from "../../assets/Images/videoFile.mp4";

export function VideoUpload() {
  // const manageThumbnail = ()=>{
  //     photoName = $refs.photo.files[0].name
  //     const reader = new FileReader()
  //     reader.onload = (e) => {
  //         photoPreview = e.target.result;
  //     };
  //     reader.readAsDataURL($refs.photo.files[0])
  // }

  return (
    <Card
      color="transparent"
      shadow={false}
      className="mt-28 px-16 bg-blue-gray-400"
    >
      <Typography variant="h4" color="blue-gray">
        Upload a Video
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2  max-w-screen-lg  flex flex-col">
        <div>
          <Typography variant="h6" color="blue-gray" className="mb-3">
            Select a Video
          </Typography>

          <div className="flex flex-row gap-6 justify-between">
            <div className="!border-blue-gray-200 focus:!border-gray-900 border border-solid w-[300px]">
              <input type="file" name="file" id="file" className="sr-only" />
              <label
                htmlFor="file"
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

            <div className="w-[50%] rounded-md">
              {/* <VideoPlayer />
               */}
              <HoverVideoPlayer className='rounded-md'
                videoSrc={videoFile}
                //   pausedOverlay={
                //     <img
                //       src={thumbnail}
                //       alt=""
                //       style={{
                //         // Make the image expand to cover the video's dimensions
                //         width: "100%",
                //         height: "100%",
                //         objectFit: "cover",
                //       }}
                //     />
                //   }
                loadingOverlay={
                  <div className="loading-overlay">
                    <div className="loading-spinner" />
                  </div>
                }
              />{" "}
            </div>
          </div>
        </div>


<div className="mt-5">
<Typography variant="h6" color="blue-gray" className="-mb-3">
            Select a Thumbnail
          </Typography>
    <div className="flex flex-row justify-between gap-6">
    <label className="block">
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4  file:rounded-full file:border-0  file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700      hover:file:bg-violet-100   "
                />
              </label>
    </div>
    <div>
    <img
                className="h-24 w-24 object-cover rounded-sm "
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                alt="Selected Thumbnail Photo"
              />
    </div>
</div>
        {/* <div className="mb-1 flex flex-col gap-6">


    
        <div className="mb-6 pt-4">
      
</div>
      
      
          <div className="flex">
            <div>
             
            </div>
            <div className="shrink-0 ml-4">
            
            </div>
          </div>

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Title
          </Typography>

          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Description
          </Typography>
          <Textarea
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          ></Textarea>
        </div> */}
        {/* <Checkbox
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
        <Button className="mt-6" fullWidth>
         Upload
        </Button> */}
      </form>
    </Card>
  );
}
