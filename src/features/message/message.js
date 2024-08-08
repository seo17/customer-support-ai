import { messagesArray } from "@/common";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMessages: messagesArray,
};

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.allMessages.push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;

export default messageSlice.reducer;
