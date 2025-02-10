import React, { useEffect, useState } from "react";
import "./Mystyle.css";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NightlightIcon from "@mui/icons-material/Nightlight";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from '@mui/icons-material/Search';
import ConversationsItem from "./ConversationsItem";

import io from "socket.io-client";
const socket = io("http://localhost:5000");

const Sidebar = ({user,setActiveChat}) => {
    const [conversations,setConversations]=useState([
        //  {
        //    name:"Test#1",
        //    lastMessage:"Last Message #1",
        //    timeStamp:"today",
        // }
      ]);
      useEffect(()=>{
        socket.emit("userConnected", user);
        socket.on("onlineUsers", (users) => {
          const updatedUsers = users.map((username) => ({
            name: username,
            lastMessage: "Hello!", 
            timeStamp: new Date().toLocaleTimeString(), 
          }));
          console.log("online users are ",users);
          setConversations(updatedUsers);
        });
        return ()=>{
          socket.off("onlineUsers");
        };
      },[]);
  return (
<div className="sidebar-container">
      <div className="sb-header">
        <div>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <PersonAddAlt1Icon />
          </IconButton>
          <IconButton>
            <GroupAddIcon />
          </IconButton>
          <IconButton>
            <AddCircleIcon />
          </IconButton>
          <IconButton>
            <NightlightIcon />
          </IconButton>
        </div>
      </div>
      <div className="sb-search">
        <IconButton>
          <SearchIcon/>
        </IconButton>
          <input placeholder="search" className="search-box" />
      </div>
      <div className="sb-conversations" onClick={()=>setActiveChat(user)}>
        {conversations.map((conversation)=>{
          return <ConversationsItem props={conversation} key={conversation.name}/>
        })}
      </div>
    </div>
  )
}

export default Sidebar
