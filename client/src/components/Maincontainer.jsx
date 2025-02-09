import React from 'react'
import Sidebar from './Sidebar'
import ChatArea from './Chatarea'
import "./Mystyle.css";

const Maincontainer = () => {
  return (
    <div className='main-container'>
      <Sidebar/>
      <ChatArea/>
    </div>
  )
}

export default Maincontainer
