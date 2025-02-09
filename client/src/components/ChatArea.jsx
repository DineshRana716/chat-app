import React from "react";
import "./Mystyle.css";
import ConversationsItem from "./ConversationsItem";
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from "@mui/material";

const Chatarea = () => {
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
  // const SenderMessages=[
  //   {
  //    message:"hello"
  //   },
  //   {
  //     message:"fine"
  //   }
  // ];
  // const ReceiverMessages=[
  //   {
  //    message:"doing well"
  //   },
  //   {
  //     message:"ok"
  //   }
  // ];

  return (
    <div className="chatarea-container">
      <div className="chatarea-header">
        <ConversationsItem props={userdata} newstyle={customStyle} />
      </div>
      <div className="messages-container">
        <div className="received-message ">
          <p className="message bg-green-200 rounded-lg">how are you?</p>
        </div>
        <div className="sent-message self-end">
          <p className="message bg-green-200 rounded-lg">Im ok ok ok fine. Thank You </p>
        </div>
      </div>
      <div className="flex w-full gap-2">
        <input
          type="text"
          placeholder="type message here"
          className="flex-1 p-2  rounded-md"
          />
          <IconButton>
            <SendIcon/>
            </IconButton>
      </div>
    </div>
  );
};

export default Chatarea;
