import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/UserReducer";
import { videoReducer } from "./reducers/VideoReducer";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from "redux-persist/lib/storage";

// import persistStore from "redux-persist/es/persistStore";


const rootReducer = combineReducers({
  user: userReducer,
  video : videoReducer
});

const persistConfig ={
  key : 'root',
  storage,
  version : 1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// const initialState = {};
// const middleware = [thunk];

export const store = configureStore({
  reducer : persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(thunk),

});

export const persistor = persistStore(store)