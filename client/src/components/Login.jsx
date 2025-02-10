import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Correct import

const Login = ({setUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Use this instead of Navigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.username);
      setUser(res.data.username);
      navigate("/"); 
    } catch (err) {
      alert("Invalid credentials from client side");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="bg-blue-200" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
