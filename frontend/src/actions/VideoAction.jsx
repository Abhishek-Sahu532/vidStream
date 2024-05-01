import {
  VIDEO_UPLOAD_FAIL,
  VIDEO_UPLOAD_REQUEST,
  VIDEO_UPLOAD_SUCCESS,
} from "../constaints/VideoConstaints";
import axios  from 'axios'


const extractErrorMessage = (htmlResponse) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlResponse, 'text/html');
  const errorMessage = doc.body.innerHTML.match(/Error.*?(?=<br>)/i); 
  console.log("errorMessage", errorMessage)
  return errorMessage ? errorMessage[0].trim() : ''; 
};











//UPLOAD A VIDEO
export const uploadAVideo = (formdata) => async (dispatch) => {
  console.log('formdata', formdata)
  try {
    dispatch({ type: VIDEO_UPLOAD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `/api/v1/video/publish-a-video`,
      config,
      formdata
    );
    dispatch({ type: VIDEO_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: VIDEO_UPLOAD_FAIL,
      payload:  extractErrorMessage(error.response.data)
    });
  }
};
