import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("");

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.emit("userConnected", user);

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user]);

  const sendMessage = () => {
    socket.emit("sendMessage", { sender: user, receiver, message, room });
    setMessages((prev) => [...prev, { sender: user, message }]);
    setMessage("");
  };

  const joinRoom = () => {
    socket.emit("joinRoom", room);
  };

  return (
    <div>
      <h2>Chat App</h2>
      <div>
        <h3>One-on-One Chat</h3>
        <input
          type="text"
          placeholder="Receiver Username"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>

      <div>
        <h3>Group Chat</h3>
        <input
          type="text"
          placeholder="Room Name"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h3>Messages</h3>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.sender}:</b> {msg.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Chat;
