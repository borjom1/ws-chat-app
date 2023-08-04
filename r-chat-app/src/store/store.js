import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import authReducer, {authSlice} from "./slice/authSlice";
import chatReducer, {chatSlice} from "./slice/chatSlice";

const rootReducer = combineReducers({
  [authSlice.name]: authReducer,
  [chatSlice.name]: chatReducer
});

export default configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
      serializableCheck: false
  })
});