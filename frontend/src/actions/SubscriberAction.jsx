import {
  CREATE_SUBSCRIBER_REQUEST,
  CREATE_SUBSCRIBER_SUCCESS,
  CREATE_SUBSCRIBER_FAIL,
  DELETE_SUBSCRIBER_REQUEST,
  DELETE_SUBSCRIBER_SUCCESS,
  DELETE_SUBSCRIBER_FAIL,
  GET_USER_SUBSCRIPTION_REQUEST,
  GET_USER_SUBSCRIPTION_SUCCESS,
  GET_USER_SUBSCRIPTION_FAIL,
  GET_USER_SUBSCRIBED_CHANNEL_REQUEST,
  GET_USER_SUBSCRIBED_CHANNEL_SUCCESS,
  GET_USER_SUBSCRIBED_CHANNEL_FAIL,
} from "../constaints/SubscriberConstaints";
import axios from "axios";

export const createASubscriber = (id) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUBSCRIBER_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/subscriber/create-a-subscriber/${id}`,
      config
    );
    dispatch({ type: CREATE_SUBSCRIBER_SUCCESS, payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_SUBSCRIBER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteASubscriber = (id) => async (dispatch) => {
  try {
    // console.log(id)
    dispatch({ type: DELETE_SUBSCRIBER_REQUEST });
    const { config } = { headers: { Content_Type: "application/json" } };
    const { data } = await axios.delete(
      `/api/v1/subscriber/delete-a-subscriber/${id}`,
      config
    );
    dispatch({ type: DELETE_SUBSCRIBER_SUCCESS, payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_SUBSCRIBER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getUserSubscriber = (username) => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_SUBSCRIPTION_REQUEST });
    const { config } = { headers: { "Content-Type": "application.json" } };
    const { data } = await axios.get(`/api/v1/subscriber/${username}`, config);
    dispatch({ type: GET_USER_SUBSCRIPTION_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_USER_SUBSCRIPTION_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const getUserSubscribedChannel = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_SUBSCRIBED_CHANNEL_REQUEST });
    const { config } = { headers: { "Content-Type": "application.json" } };
    const { data } = await axios.get(
      `/api/v1/subscriber/subscribed-channels`,
      config
    );
    dispatch({ type: GET_USER_SUBSCRIBED_CHANNEL_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_USER_SUBSCRIBED_CHANNEL_FAIL,
      payload: error.response.data.message,
    });
  }
};
