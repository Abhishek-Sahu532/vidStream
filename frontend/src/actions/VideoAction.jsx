import {
  VIDEO_UPLOAD_FAIL,
  VIDEO_UPLOAD_REQUEST,
  VIDEO_UPLOAD_SUCCESS,
} from "../constaints/VideoConstaints";

//UPLOAD A VIDEO
export const uploadAVideo = (formdata = async (dispatch) => {
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
      payload: error.message,
    });
  }
});
