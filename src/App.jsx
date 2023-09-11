import { useState } from "react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = import.meta.env.OPENAI_API_KEY;

const App = () => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatGPT",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    //update message state
    setMessages(newMessages);

    //show chatGpt is typing
    setTyping(true);
    //process message to chatGpt
    await processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (chatMessages) => {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";

      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: "system",
      content:
        "write resume as a professional resume maker. your name is resume man",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages], //[message1, message2, message3]
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data?.json();
      })
      .then((data) => {
        // console.log(data?.choices[0].message.content);
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data?.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
        setTyping(false);
      });
  };
  return (
    <>
      <div className="">
        <div style={{ position: "relative", height: "550px", width: "800px" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  typing ? (
                    <TypingIndicator content="ChatGPT is typing" />
                  ) : null
                }>
                <h1>This my my new chatGPT</h1>
                {messages?.map((message, i) => {
                  return <Message key={i} model={message} />;
                })}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
};

export default App;
