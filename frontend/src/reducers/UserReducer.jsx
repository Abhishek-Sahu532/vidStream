import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  FETCH_USER_HISTORY_REQUEST,
  FETCH_USER_HISTORY_SUCCESS,
  FETCH_USER_HISTORY_FAIL,
  CLEAR_ERRORS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  GET_USERPROFILE_REQUEST,
  GET_USERPROFILE_SUCCESS,
  GET_USERPROFILE_FAIL,
  CREATE_SUBSCRIBER_REQUEST,
  CREATE_SUBSCRIBER_SUCCESS,
  CREATE_SUBSCRIBER_FAIL,
} from "../constaints/UserConstaints";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        success: true,
      };
    case LOGIN_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case REGISTER_USER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };
    case LOGOUT_FAIL:
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

export const forgetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        success: true,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case FORGET_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
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

export const fetchUserHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_USER_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_USER_HISTORY_FAIL: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getUserProfileReducer = (state = { userProfile: {} }, action) => {
  switch (action.type) {
    case GET_USERPROFILE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_USERPROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        userProfile: action.payload,
        success: true,
      };
    case GET_USERPROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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

export const createSubscriberReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SUBSCRIBER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SUBSCRIBER_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CREATE_SUBSCRIBER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
