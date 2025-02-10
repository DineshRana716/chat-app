import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './Chatarea'
import "./Mystyle.css";
import { useState } from 'react';

const Maincontainer = ({user}) => {
  const [activeChat, setActiveChat] = useState(null);
  return (
    <div className='main-container'>
      <Sidebar user={user} setActiveChat={setActiveChat} />
      <ChatArea user={user} activeChat={activeChat}/>
    </div>
  )
}

export default Maincontainer
