import {
  CREATE_SUBSCRIBER_REQUEST,
  CREATE_SUBSCRIBER_SUCCESS,
  CREATE_SUBSCRIBER_FAIL,
  CREATE_SUBSCRIBER_RESET,
  DELETE_SUBSCRIBER_REQUEST,
  DELETE_SUBSCRIBER_SUCCESS,
  DELETE_SUBSCRIBER_FAIL,
  DELETE_SUBSCRIBER_RESET,
  GET_USER_SUBSCRIPTION_REQUEST,
  GET_USER_SUBSCRIPTION_SUCCESS,
  GET_USER_SUBSCRIPTION_FAIL,
  GET_USER_SUBSCRIBED_CHANNEL_REQUEST,
  GET_USER_SUBSCRIBED_CHANNEL_SUCCESS,
  GET_USER_SUBSCRIBED_CHANNEL_FAIL,
  CLEAR_ERRORS,
} from "../constaints/SubscriberConstaints";

export const createSubscriberReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBSCRIBER_REQUEST:
    case DELETE_SUBSCRIBER_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case CREATE_SUBSCRIBER_SUCCESS:
    case DELETE_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case CREATE_SUBSCRIBER_FAIL:
    case DELETE_SUBSCRIBER_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CREATE_SUBSCRIBER_RESET:
    case DELETE_SUBSCRIBER_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        error: null,
      };
    case CLEAR_ERRORS:
      return {
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const getUserSubscriberReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_SUBSCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriber: action.payload.data,
      };
    case GET_USER_SUBSCRIPTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getUserSubscribedChannelReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_SUBSCRIBED_CHANNEL_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
        error: null,
      };
    case GET_USER_SUBSCRIBED_CHANNEL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        subscribedChannels: action.payload.data,
      };
    case GET_USER_SUBSCRIBED_CHANNEL_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
