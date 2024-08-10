"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

function MessageContainer() {
  const getMessages = useSelector((state) => {
    return state.allMessages;
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [getMessages]);

  return (
    <div className="w-full h-full overflow-auto">
      <div className="flex flex-col gap-3 w-full">
        {getMessages.map((messageItem, index) =>
          messageItem.role === "assistant" ? (
            <div
              key={index}
              className="self-start w-fit max-w-[65%] md:max-w-[55%]"
            >
              <div className="rounded-2xl p-3 bg-grey-100 flex flex-row justify-center items-center w-fit">
                <p className="font-normal text-sm md:text-base text-black">
                  {messageItem.content}
                </p>
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="self-end w-fit max-w-[65%] md:max-w-[35%]"
            >
              <div className="rounded-2xl p-3 bg-primary flex flex-row justify-center items-center w-fit">
                <p className="font-normal text-sm md:text-base text-white">
                  {messageItem.content}
                </p>
              </div>
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default MessageContainer;
