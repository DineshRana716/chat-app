import React, { useEffect } from "react";
import "./Mystyle.css";
import ConversationsItem from "./ConversationsItem";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { io } from "socket.io-client";
import { useState } from "react";

const socket = io("http://localhost:5000");

const Chatarea = ({ user, activeChat }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receivedmsg, setReceivedmsg] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setReceivedmsg((prev) => [...prev, data]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  const sendMessage = () => {
    if (!activeChat) return alert("please select a valid user to chat with");
    socket.emit(
      "sendMessage",
      { sender: user, receiver: activeChat, message },
      console.log("msg sent successfully")
    );
    setMessages((prev) => [...prev, { sender: user, message }]);
    setMessage("");
  };

  const userdata = {
    name: "Test#1",
    lastMessage: "Last Message #1",
    timeStamp: "today",
  };
  const customStyle = {
    padding: "10px",
    width: "15vw",
    borderRadius: "5px",
  };
  return (
    <div className="chatarea-container">
      <div className="chatarea-header">
        <ConversationsItem props={userdata} newstyle={customStyle} />
      </div>
      <div className="messages-container">
      {messages.map((msg, index) => (
    <div
      key={index}
      className={`message-container flex ${
        msg.sender === user ? "justify-end" : "justify-start"
      }`}
    >
      <p
        className={`message p-2 rounded-lg ${
          msg.sender === user ? "bg-green-200" : "bg-blue-200"
        }`}
      >
        {msg.message}
      </p>
    </div>
  ))}
      </div>
      <div className="flex w-full gap-2 bg-white">
        <input
          type="text"
          placeholder="type message here"
          className="flex-1 p-2 rounded-md"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chatarea;
