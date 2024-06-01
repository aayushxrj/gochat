import React, {useState} from "react";
import Connect from './components/connect.jsx'
import Chat from './components/chat.jsx'
import './App.css'

function App() {
  const [isJoined, setIsJoined] = useState(false);

  const [username, setUsername] = useState("");

  const handleJoin = (username) => {
    setIsJoined(true);
    setUsername(username);
  }

  return (
    <>
      {isJoined ? <Chat username={username}/> : <Connect onJoin={handleJoin} />}
    </>
  )
}

export default App;
