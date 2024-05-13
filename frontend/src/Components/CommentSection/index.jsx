import { Textarea, IconButton, Avatar } from "@material-tailwind/react";
// import { LinkIcon } from "@heroicons/react/24/outline";
import "emoji-picker-element";

import { useForm } from "react-hook-form";
import { createAComment } from "../../actions/Comment.Action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
export const CommentSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const myForm = new FormData()
    myForm.append('content' , data.content)
    dispatch(createAComment(id , myForm))  
  };
  return (
    <>
      <div className="bg-gray-100 p-6">
        <h2 className="text-lg font-bold mb-4">Comments</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-bold mb-2">Add a comment</h3>
          <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
            <div className="flex">
              {/* <emoji-picker></emoji-picker> */}
              <IconButton variant="text" className="rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                  />
                </svg>
              </IconButton>
            </div>
            <Textarea
              {...register("content", {
                required: "Comment is required",
              })}
              rows={1}
              resize={true}
              placeholder="Your Message"
              className="min-h-full !border-0 focus:border-transparent"
              containerProps={{
                className: "grid h-full",
              }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <div>
              <IconButton
                variant="text"
                className="rounded-full"
               type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </IconButton>
            </div>
          </div>
         
        </form>

        {errors.content && (
            <p className="my-2 text-red-600">{errors.content.message}</p>
          )}
        {/* <div className="flex flex-col space-y-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-md ">
            <div className="flex gap-4">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
              <div>
                {" "}
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Posted on April 17, 2023
                </p>
              </div>
            </div>

            <p className="text-gray-700">
              This is a sample comment. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md ">
            <div className="flex gap-4">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
              <div>
                {" "}
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Posted on April 17, 2023
                </p>
              </div>
            </div>

            <p className="text-gray-700">
              This is a sample comment. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md ">
            <div className="flex gap-4">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
              />
              <div>
                {" "}
                <h3 className="text-lg font-bold">John Doe</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Posted on April 17, 2023
                </p>
              </div>
            </div>
            <p className="text-gray-700">
              This is a sample comment. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
};
