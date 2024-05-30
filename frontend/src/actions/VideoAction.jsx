import {
  VIDEO_UPLOAD_FAIL,
  VIDEO_UPLOAD_REQUEST,
  VIDEO_UPLOAD_SUCCESS,
  VIDEO_FETCHED_REQUEST,
  VIDEO_FETCHED_SUCCESS,
  VIDEO_FETCHED_FAIL,
  VIDEO_DETAILS_FAIL,
  VIDEO_DETAILS_REQUEST,
  VIDEO_DETAILS_SUCCESS,
} from "../constaints/VideoConstaints";
import axios from "axios";

const extractErrorMessage = (htmlResponse) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlResponse, "text/html");
  const errorMessage = doc.body.innerHTML.match(/Error.*?(?=<br>)/i);
  console.log("errorMessage", errorMessage);
  return errorMessage ? errorMessage[0].trim() : "";
};

//UPLOAD A VIDEO
export const uploadAVideo = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_UPLOAD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    // console.log("formdata", formdata);
    const { data } = await axios.post(
      "/api/v1/video/publish-a-video",
      formdata,
      config
    );
    dispatch({ type: VIDEO_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: VIDEO_UPLOAD_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

//FETCH VIDEOS

export const fetchAllVideos = ({searchQuery='', page=1}) => async (dispatch) => {
  try {
    // console.log('123', searchQuery)
    dispatch({ type: VIDEO_FETCHED_REQUEST });
console.log(page)
    let url = `/api/v1/video/all-videos?query=${searchQuery}&page=${page}`;

    // keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}

    const { data } = await axios.get(url);
    dispatch({ type: VIDEO_FETCHED_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: VIDEO_FETCHED_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

export const getVideosDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: VIDEO_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/v1/video/${id}`);

    dispatch({ type: VIDEO_DETAILS_SUCCESS, payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: VIDEO_DETAILS_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};
