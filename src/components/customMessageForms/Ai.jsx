import React, { useState } from "react";
import { MessageFormUI } from "./MessageFormUi";
import { usePostAiTextMutation } from "@/state/api";

export const Ai = ({ props, activeChat }) => {
  console.log(props);
  console.log(activeChat);
  const [message, setMessage] = useState("");

  const [attachment, setAttachment] = useState("");
  const [trigger] = usePostAiTextMutation();

  const handleOnChnage = (e) => setMessage(e.target.value);

  const handleOnSubmit = async (e) => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)} + 00:00`);

    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];

    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    props.onSubmit(form);
    trigger(form);
    setMessage("");
    setAttachment("");
  };
  return;
  <MessageFormUI
    setAttachment={setAttachment}
    message={message}
    handleOnChange={handleOnChnage}
    handleOnSubmit={handleOnSubmit}
  />;
};
