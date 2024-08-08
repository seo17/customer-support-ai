import React from "react";

function ChatHeader() {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          {/* Bot Profile Info */}
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full">
              <img
                src="bot.png"
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-0">
              <p className="font-semibold text-xl leading-5 text-black">
                Aidan
              </p>
              <p className="font-light text-xs text-black">Online</p>
            </div>
          </div>

          {/* Chat Header Icon */}
          <div className="flex flex-row items-center justify-center gap-x-3"></div>
        </div>
        <hr className="h-px bg-grey-200/55 border-0" />
      </div>
    </div>
  );
}

export default ChatHeader;
