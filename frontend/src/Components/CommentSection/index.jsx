import { Textarea, IconButton, Avatar } from "@material-tailwind/react";
import "emoji-picker-element";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  newCommentRequest,
  newCommentSuccess,
  newCommentFailure,
  getCommentsRequest,
  getCommentsSuccess,
  getCommentsFailure,
} from "../../Slices/CommentSlices";
import { extractErrorMessage } from "../../extractErrorMessage";
import axios from "axios";
import { Loader } from "../Loader";
import { formatTimeDifference } from "../dateformat";

export const CommentSection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
 
  const { comments, loading } = useSelector((state) => state.comments);
  const { success } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  //SUBMIT THE NEW COMMENTS //creating a new comment
  const onSubmit = async (data) => {
    const myForm = new FormData();
    myForm.append("content", data.content);
    if (!success) {
      toast.error("Login to comment");
      return;
    }
    try {
      dispatch(newCommentRequest());
      const config = {
        headers: {
          "Content-Type": "application/json",
          withCredentials: true,
        },
      };
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.post(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/comment/create-a-comment/${id}`,
          myForm,
          config
        );
        dispatch(newCommentSuccess(res.data));
      } else {
        const res = await axios.post(
          `/api/v1/comment/create-a-comment/${id}`,
          myForm,
          config
        );
        dispatch(newCommentSuccess(res.data));
      }
      reset();
      getVideoComments(id);
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(newCommentFailure(errorMessage || error.message));
    }
  };

  //GET VIDEO COMMENTS
  const getVideoComments = async (id) => {
    try {
      dispatch(getCommentsRequest());
      if (import.meta.env.VITE_DEV_MODE == "production") {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/comment/getcomments/${id}`,
          { withCredentials: true }
        );
        dispatch(getCommentsSuccess(res.data.data));
      } else {
        const res = await axios.get(`/api/v1/comment/getcomments/${id}`);
        dispatch(getCommentsSuccess(res.data.data));
      }
    } catch (error) {
      const errorMessage = extractErrorMessage(error.response?.data);
      dispatch(getCommentsFailure(errorMessage || error.message));
    }
  };

  useEffect(() => {
    getVideoComments(id);
  }, [dispatch, id]);

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
              <IconButton variant="text" className="rounded-full" type="submit">
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
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          {comments && comments?.docs?.length < 0 ? (
            <h1 className="text-blue-gray-700">
              There is nothing to show, be the first to comment
            </h1>
          ) : (
            <div className="flex flex-col space-y-4 mt-4">
              {comments?.docs?.map((com) => (
                <div
                  key={com?._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="flex gap-4">
                    <Avatar src={com?.owner?.avatar} alt="avatar" />
                    <div>
                      <h3 className="text-lg font-bold">
                        {com?.owner?.fullname}
                      </h3>
                      <p className="text-gray-700 text-sm mb-2">
                    {  formatTimeDifference(com?.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">{com?.content}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
