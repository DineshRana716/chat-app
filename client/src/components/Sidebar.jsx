import React, { useState } from "react";
import "./Mystyle.css";
import { IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import NightlightIcon from "@mui/icons-material/Nightlight";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from '@mui/icons-material/Search';
import ConversationsItem from "./ConversationsItem";

const Sidebar = () => {
    const [conversations,setConversations]=useState([
        {
          name:"Test#1",
          lastMessage:"Last Message #1",
          timeStamp:"today",
        },
        {
          name:"Test#2",
          lastMessage:"Last Message #2",
          timeStamp:"today",
        },
        {
          name:"Test#3",
          lastMessage:"Last Message #3",
          timeStamp:"today",
        }
      ])
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
      <div className="sb-conversations">
        {conversations.map((conversation)=>{
          return <ConversationsItem props={conversation} key={conversation.name}/>
        })}
      </div>
    </div>
  )
}

export default Sidebar
