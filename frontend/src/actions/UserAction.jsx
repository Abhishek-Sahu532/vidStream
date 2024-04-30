import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
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
    console.log("user", data);
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
    
      payload: error.response.data.message,
    });
    console.log('error from action', error)
  }
 
};

export const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/users/login`,
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
   console.log(
    'action error', error.response.data
   )
    dispatch({ type: LOGIN_FAIL, payload:  extractErrorMessage(error.response.data) });
    // console.log('error from action', error.response.data )
  }

};
