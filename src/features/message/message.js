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
    replaceMessage: (state, action) => {
      state = action.payload;

      return state;
    },
  },
});

export const { addMessage, replaceMessage } = messageSlice.actions;

export default messageSlice.reducer;
