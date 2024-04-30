import { REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL,  } from "../constaints/UserConstaints";
import axios from 'axios'

export const registerUser = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      const config = { headers: { "Content-Type": "multipart/form-data" } }; //multipart/form-data instead of json type, because in registration images also included
  console.log('userdata', userData)
      const { data } = await axios.post(`/api/v1/users/register`, userData, config);
console.log('user', data)
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };