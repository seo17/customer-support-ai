import messageReducer from "../features/message/message";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: messageReducer,
});
