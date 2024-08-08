import React from "react";
import ChatHeader from "../ChatHeader";
import MessageContainer from "../MessageContainer";
import SendMessageContainer from "../SendMessageContainer";

function Chat() {
  return (
    <section id="chat" className="w-full md:w-[80%]">
      <div className=" h-[100vh] md:h-[85vh] flex flex-col space-y-3 bg-white md:rounded-3xl shadow-lg shadow-sky-blue/40 px-7 py-5  ">
        <ChatHeader />

        <MessageContainer />

        <SendMessageContainer />
      </div>
    </section>
  );
}

export default Chat;
