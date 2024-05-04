import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
} from "../constaints/UserConstaints";
import axios from "axios";

const extractErrorMessage = (htmlResponse) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlResponse, 'text/html');
  const errorMessage = doc.body.innerHTML.match(/Error.*?(?=<br>)/i);
  console.log("errorMessage", errorMessage)
  return errorMessage ? errorMessage[0].trim() : '';
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } }; //multipart/form-data instead of json type, because in registration images also included
    console.log("userdata", userData);
    const { data } = await axios.post(
      `/api/v1/users/register`,
      userData,
      config
    );

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    console.log("usesfsdfdsfr", data);
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,

      payload: error.response.data.message,
    });
  }

};

export const signin = (email, username,  password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/users/login`,
      { email,username, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.data.user });
    console.log(data.data.user)
  } catch (error) {
    console.log(
      'action error', error.response.data
    )
    dispatch({ type: LOGIN_FAIL, payload: extractErrorMessage(error.response.data) });
    // console.log('error from action', error.response.data )
  }

};


export const signout = () => async (dispatch) => {
try {
  await axios.get(`/api/v1/users/logout`)
  dispatch({type: LOGOUT_SUCCESS})
} catch (error) {
  dispatch({ type: LOGOUT_FAIL, payload: extractErrorMessage(error.response.data) });
}
}