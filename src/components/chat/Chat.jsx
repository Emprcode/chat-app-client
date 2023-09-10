import React from "react";
import {
  useMultiChatLogic,
  MultiChatSocket,
  MultiChatWindow,
} from "react-chat-engine-advanced";
import { Header } from "../customHeader/Header";
import { StandardMessageForm } from "../customMessageForms/StandardMessageForm";
import { Ai } from "../customMessageForms/Ai";

const Chat = () => {
  const chatProps = useMultiChatLogic(
    // import.meta.env.CHAT_PROJECT_ID,
    "bcc20375-853b-4bdd-953d-0ee4f9654a78",
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
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith("AiChat_")) {
            return <Ai props={props} activeChat={chatProps.chat} />;
          }
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          );
        }}
      />
    </div>
  );
};

export default Chat;
