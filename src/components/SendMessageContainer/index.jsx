"use client";
import { getResponse } from "@/actions";
import { icons, initialMessage, messagesArray } from "@/common";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "@/features/message/message";

function SendMessageContainer() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(initialMessage);

  const handleKeyPress = async (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      await handleSubmit();
    }
  };

  const handleSubmit = async () => {
    console.log("submitted");

    setMessage({
      role: "user",
      content: "",
    });

    dispatch(addMessage(message));

    const answer = await getResponse(message);

    dispatch(addMessage(answer));
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-center">
      {/* Input Field */}
      <div className="bg-secondary flex flex-row rounded-xl p-3 w-full h-auto">
        <textarea
          onKeyDown={handleKeyPress}
          id="chatMessageBox"
          className="bg-secondary outline-none w-full rounded-md resize-none overflow-hidden"
          rows="1"
          placeholder="Type your message..."
          value={message.content}
          onChange={(e) => setMessage({ ...message, content: e.target.value })}
          style={{ maxHeight: "12rem" }}
        ></textarea>
        <div className="flex items-end ml-2">{icons.attachFile}</div>
      </div>

      {/* Send Button */}
      <button
        onClick={handleSubmit}
        className="rounded-lg bg-primary flex flex-row justify-center items-center w-12 h-12 hover:bg-primary/65"
      >
        {icons.send}
      </button>
    </div>
  );
}

export default SendMessageContainer;
