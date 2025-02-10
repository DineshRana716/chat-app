import React from 'react'
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Maincontainer from './components/Maincontainer'
import Login from './components/Login'

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  return (
<Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Maincontainer user={user} /> : <Login setUser={setUser} />}
        />
      </Routes>
    </Router>
  )
}

export default App
