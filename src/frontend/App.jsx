import React, {useState} from "react";
import Connect from './components/connect.jsx'
import Chat from './components/chat.jsx'
import './App.css'

function App() {
  const [isJoined, setIsJoined] = useState(false);

  const handleJoin = (username) => {
    setIsJoined(true);
  }

  return (
    <>
      {isJoined ? <Chat /> : <Connect onJoin={handleJoin} />}
    </>
  )
}

export default App;
