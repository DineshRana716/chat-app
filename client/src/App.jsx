import React from 'react'
import Sidebar from './components/Sidebar'
import Maincontainer from './components/Maincontainer'

const App = () => {
    // const [user, setUser] = useState(localStorage.getItem("user"));
  //<div>{user ? <Chat user={user} /> : <Login setUser={setUser} />}</div>;
  return (
    <div>
      <Maincontainer/>
    </div>
  )
}

export default App
