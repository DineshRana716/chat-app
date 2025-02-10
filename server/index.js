const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Server } = require("socket.io");
const http = require("http");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }, 
});

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/chatApp")
  .then(console.log("database connected"));

// Store connected users
let onlineUsers = {};

// User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// Message Schema
const MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
  room: String, // Optional for group chats
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", MessageSchema);

// Hardcoded users
const users = [
  { username: "dinesh", password: bcrypt.hashSync("pass123", 10) },
  { username: "devansh", password: bcrypt.hashSync("pass123", 10) },
  { username: "prakhar", password: bcrypt.hashSync("pass123", 10) },
];
// API to Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username }, "secret", { expiresIn: "1h" });
    return res.json({ token, username });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Socket.io for Real-time Chat
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("userConnected", (username) => {
    onlineUsers[username] = socket.id;
    console.log(`${username} is online`);
    io.emit("onlineUsers", Object.keys(onlineUsers));
  });

  socket.on("sendMessage", async (data) => {
    const { sender, receiver, message, room } = data;

    const newMessage = new Message({ sender, receiver, message, room });
    await newMessage.save();

    if (room) {
      io.to(room).emit("receiveMessage", data); // Group chat
    } else {
      if (onlineUsers[receiver]) {
        io.to(onlineUsers[receiver]).emit("receiveMessage", data);
      }
    }
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
