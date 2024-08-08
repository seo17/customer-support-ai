import { IconSend, IconPaperclip } from "@tabler/icons-react";

export const icons = {
  send: <IconSend stroke={2} color={"#FFF"} />,
  attachFile: <IconPaperclip stroke={2} color={"#333333"} />,
};

export const messagesArray = [
  {
    role: "assistant",
    content: "Hi, How can help you?",
  },
  {
    role: "user",
    content: "I'm good",
  },
];

export const initialMessage = {
  role: "user",
  content: "",
};
