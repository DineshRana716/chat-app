import React from "react";

const ConversationsItem = ({ props ,newstyle}) => {
  return (
    <div className="conversation-container" style={newstyle}>
      <div className="col-left">
        <p className="con-icon">{props.name[0]}</p>
      </div>
      <div className="col-right">
        <p className="con-title">{props.name}</p>
        <div className="row-last">
          <p className="con-lastMessage">{props.lastMessage}</p>
          <p className="con-timeStamp">{props.timeStamp}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationsItem;
