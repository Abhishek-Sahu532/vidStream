import axios from "axios";
import {
  NEW_COMMENT_FAIL,
  NEW_COMMENT_REQUEST,
  NEW_COMMENT_SUCCESS,
  GET_COMMENT_REQUEST,
  GET_COMMENT_SUCCESS,
  GET_COMMENT_FAIL,
} from "../constaints/CommentConstaints";
const extractErrorMessage = (htmlResponse) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlResponse, "text/html");
  const errorMessage = doc.body.innerHTML.match(/Error.*?(?=<br>)/i);
  console.log("errorMessage", errorMessage);
  return errorMessage ? errorMessage[0].trim() : "";
};

export const createAComment = (id, content) => async (dispatch) => {
  try {
    // console.log('content', content)
    dispatch({ type: NEW_COMMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/comment/create-a-comment/${id}`,
      content,
      config
    );
    dispatch({ type: NEW_COMMENT_SUCCESS, payload: data });
    // console.log(data)
  } catch (error) {
    console.log(error);
    dispatch({
      type: NEW_COMMENT_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

export const getVideoComments = (videoId) => async (dispatch) => {
  try {
    dispatch({ type: GET_COMMENT_REQUEST });
    // console.log(videoId);
    const { data } = await axios.get(`/api/v1/comment/getcomments/${videoId}`);
    dispatch({ type: GET_COMMENT_SUCCESS, payload: data });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: GET_COMMENT_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};
