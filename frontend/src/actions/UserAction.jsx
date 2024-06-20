import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  GET_USERPROFILE_REQUEST,
  GET_USERPROFILE_SUCCESS,
  GET_USERPROFILE_FAIL,
  GET_USER_WATCH_HISTORY_REQUEST,
  GET_USER_WATCH_HISTORY_SUCCESS,
  GET_USER_WATCH_HISTORY_FAIL,
  GOOGLE_AUTH_REQUEST,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_FAIL,
  GET_USER_VIDEO_RECOMMENDATIONS_REQUEST,
  GET_USER_VIDEO_RECOMMENDATIONS_SUCCESS,
  GET_USER_VIDEO_RECOMMENDATIONS_FAIL,
  RESET_PASSWORD_FOR_LOGGEDUSER_REQUEST,
  RESET_PASSWORD_FOR_LOGGEDUSER_SUCCESS,
  RESET_PASSWORD_FOR_LOGGEDUSER_FAIL,
  UPDATE_COVER_IMAGE_REQUEST,
  UPDATE_COVER_IMAGE_SUCCESS,
  UPDATE_COVER_IMAGE_FAIL,
  UPDATE_AVATAR_IMAGE_REQUEST,
  UPDATE_AVATAR_IMAGE_SUCCESS,
  UPDATE_AVATAR_IMAGE_FAIL,
  UPDATE_USER_DETAILS_REQUEST,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAIL,
} from "../constaints/UserConstaints";
import axios from "axios";

const extractErrorMessage = (htmlResponse) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlResponse, "text/html");
  const errorMessage = doc.body.innerHTML.match(/Error.*?(?=<br>)/i);
  // console.log("errorMessage", errorMessage);
  return errorMessage ? errorMessage[0].trim() : "";
};

// REGISTERING A USER
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } }; //multipart/form-data instead of json type, because in registration images also included
    // console.log("userdata", userData);
    const { data } = await axios.post(
      `/api/v1/users/register`,
      userData,
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    // console.log("usesfsdfdsfr", data);
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,

      payload: error.response.data.message,
    });
  }
};
//SIGN IN
export const signin = (email, username, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/users/login`,
      { email, username, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.data.user });
  } catch (error) {
    // console.log("action error", error.response.data);
    dispatch({
      type: LOGIN_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
    // console.log('error from action', error.response.data )
  }
};

//SIGN OUT
export const signout = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/users/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

//FORGET PASSWORD

export const forgetPassword = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: FORGET_PASSWORD_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `api/v1/users/forget-password`,
      myForm,
      config
    );
    dispatch({ type: FORGET_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGET_PASSWORD_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

//RESET PASSWORD

export const resetPassword =
  ({ token }, myForm) =>
  async (dispatch) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `/api/v1/users/forget-password/${token}`,
        myForm,
        config
      );

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
      // console.log("data from reset password", data);
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: extractErrorMessage(error.response.data),
      });
    }
  };

//RESET PASSWORD FOR LOGGED USER
export const resetPasswordForLoggedUser = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_FOR_LOGGEDUSER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.put(
      `/api/v1/users/reset-password`,
      myForm,
      config
    );

    dispatch({
      type: RESET_PASSWORD_FOR_LOGGEDUSER_SUCCESS,
      payload: data.success,
    });
    // console.log("data from reset password", data);
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FOR_LOGGEDUSER_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

//update cover image
export const updateCoverImage = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_COVER_IMAGE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.patch(
      `/api/v1/users/cover-image`,
      myForm,
      config
    );

    dispatch({
      type: UPDATE_COVER_IMAGE_SUCCESS,
      payload: data.success,
    });
    // console.log("data from reset password", data);
  } catch (error) {
    dispatch({
      type: UPDATE_COVER_IMAGE_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

//update avatar image
export const updateAvatarImage = (myForm) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_AVATAR_IMAGE_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.patch(
      `/api/v1/users/update-avatar`,
      myForm,
      config
    );

    dispatch({
      type: UPDATE_AVATAR_IMAGE_SUCCESS,
      payload: data.success,
    });
    // console.log("data from reset password", data);
  } catch (error) {
    dispatch({
      type: UPDATE_AVATAR_IMAGE_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};


//update avatar image
export const updateUserDetails = ({username, fullname, email}) => async (dispatch) => {
  try {
    console.log({username, fullname, email})
    dispatch({ type: UPDATE_USER_DETAILS_REQUEST });
    const config = { headers: { "Content-Type": 'application/json' } };
    const { data } = await axios.patch(
      `/api/v1/users/update-account`,
      {username, fullname, email},
      config
    );

    dispatch({
      type: UPDATE_USER_DETAILS_SUCCESS,
      payload: data.success,
    });
    // console.log("data from reset password", data);
  } catch (error) {
    dispatch({
      type: UPDATE_USER_DETAILS_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};


export const getUserDetails = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get("/api/v1/users/current-user");
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};

export const getChannelProfile = (username) => async (dispatch) => {
  try {
    dispatch({ type: GET_USERPROFILE_REQUEST });
    const { data } = await axios.get(`/api/v1/users/c/${username}`);
    dispatch({ type: GET_USERPROFILE_SUCCESS, payload: data });
    // console.log(data);
  } catch (error) {
    dispatch({
      type: GET_USERPROFILE_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

export const getUserWatchhistory = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_WATCH_HISTORY_REQUEST });
    const { config } = { headers: { "Content-Type": "application.json" } };
    const { data } = await axios.get(`/api/v1/users/history`, config);
    dispatch({ type: GET_USER_WATCH_HISTORY_SUCCESS, payload: data });
    // console.log(data)
  } catch (error) {
    dispatch({
      type: GET_USER_WATCH_HISTORY_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

export const googleAuthentication = () => async (dispatch) => {
  try {
    dispatch({ type: GOOGLE_AUTH_REQUEST });
    const { config } = { headers: { "Content-Type": "application.json" } };
    const { data } = await axios.get(`/api/v1/users/auth/google`, config);
    dispatch({ type: GOOGLE_AUTH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GOOGLE_AUTH_FAIL,
      payload: extractErrorMessage(error.response.data),
    });
  }
};

export const getVideoRecommendations = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_VIDEO_RECOMMENDATIONS_REQUEST });
    const { data } = await axios.get("/api/v1/users/video-recommentions");
    dispatch({ type: GET_USER_VIDEO_RECOMMENDATIONS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_USER_VIDEO_RECOMMENDATIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};
