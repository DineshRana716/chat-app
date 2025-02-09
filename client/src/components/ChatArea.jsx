import React from "react";
import "./Mystyle.css";
import ConversationsItem from "./ConversationsItem";

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
      <div className="text-input-area">
        <input
          type="text"
          placeholder="type message here"
          className="search-box"
        />
        <button>send</button>
      </div>
    </div>
  );
};

export default Chatarea;
