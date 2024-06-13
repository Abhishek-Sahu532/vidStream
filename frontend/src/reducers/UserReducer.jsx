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
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  GET_USERPROFILE_REQUEST,
  GET_USERPROFILE_SUCCESS,
  GET_USERPROFILE_FAIL,
  GET_USERPROFILE_RESET,
  GET_USER_WATCH_HISTORY_REQUEST,
  GET_USER_WATCH_HISTORY_SUCCESS,
  GET_USER_WATCH_HISTORY_FAIL,
  GOOGLE_AUTH_REQUEST, GOOGLE_AUTH_SUCCESS, GOOGLE_AUTH_FAIL,
  GET_USER_VIDEO_RECOMMENDATIONS_REQUEST, GET_USER_VIDEO_RECOMMENDATIONS_SUCCESS,
  GET_USER_VIDEO_RECOMMENDATIONS_FAIL,GET_USER_VIDEO_RECOMMENDATIONS_RESET,
  CLEAR_ERRORS,
} from "../constaints/UserConstaints";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_USER_REQUEST:
      case GOOGLE_AUTH_REQUEST:
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
      case GOOGLE_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        success: true,
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
    case GOOGLE_AUTH_FAIL:
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

export const getUserProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERPROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USERPROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
        success: true,
      };
    case GET_USERPROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_USERPROFILE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
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

export const getUserWatchHistoryReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_WATCH_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        success: null,
      };
    case GET_USER_WATCH_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        history: action.payload.data,
      };
    case GET_USER_WATCH_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
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


export const getVideoRecommendationsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_VIDEO_RECOMMENDATIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_USER_VIDEO_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data.recommvideos,
        success: true,
      };
    case GET_USER_VIDEO_RECOMMENDATIONS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };  
    case GET_USER_VIDEO_RECOMMENDATIONS_RESET:
      return {
        ...state,
        loading: false,
        success: false,
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