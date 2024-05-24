import {
  ADD_VIDEO_LIKE_DISLIKE_REQUEST,
  ADD_VIDEO_LIKE_DISLIKE_SUCCESS,
  ADD_VIDEO_LIKE_DISLIKE_FAIL,
} from "../constaints/LikeConsttaints";
import axios from "axios";

const extractErrorMessage = (htmlResponse) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlResponse, "text/html");
  const errorMessage = doc.body.innerHTML.match(/Error.*?(?=<br>)/i);
  // console.log("errorMessage", errorMessage);
  console.log(errorMessage);
  return errorMessage ? errorMessage[0].trim() : "";
};

export const addAVideoLikeDislike = (videoId, action) => async (dispatch) => {
  try {
    dispatch({ type: ADD_VIDEO_LIKE_DISLIKE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/like/add-a-likeDislike/${videoId}`,
      config, action
    );
    dispatch({ type: ADD_VIDEO_LIKE_DISLIKE_SUCCESS, payload: data });
    console.log(videoId);
  } catch (error) {
    dispatch({
      type: ADD_VIDEO_LIKE_DISLIKE_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};
