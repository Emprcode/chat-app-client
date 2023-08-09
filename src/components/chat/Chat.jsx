import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import { Header } from "../customHeader/Header";
import { StandardMessageForm } from "../customMessageForms/StandardMessageForm";

const Chat = () => {
  const chatProps = useMultiChatLogic(
    // import.meta.env.CHAT_PROJECT_ID,
    "e7421e36-2635-4617-80d9-c053799a51da",
    "testuser",
    "1234"
  );
  return (
    <div style={{ flexBasis: "100%" }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: "100vh" }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => (
          <StandardMessageForm props={props} activeChat={chatProps.chat} />
        )}
      />
    </div>
  );
};

export default Chat;
