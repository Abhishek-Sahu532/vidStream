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
 
  try {
    dispatch({ type: VIDEO_UPLOAD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    console.log('formdata', formdata)
    const { data } = await axios.post(
      '/api/v1/video/publish-a-video',
      formdata,
      config,
      
    );

  
    console.log('data', data)
    dispatch({ type: VIDEO_UPLOAD_SUCCESS, payload: data });
    console.log('payload', payload)
  } catch (error) {
    console.log(error)
    dispatch({
      type: VIDEO_UPLOAD_FAIL,
      payload:  extractErrorMessage(error.response.data)
    });
  }
};
