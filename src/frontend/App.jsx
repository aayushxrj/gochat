import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
// import Connect from './components/connect.jsx'
// import Chat from './components/chat.jsx'
import goLogo from './assets/goChatLogo.svg'
import './App.css'

function App() {
  // const [isJoined, setIsJoined] = useState(false);

  // const [username, setUsername] = useState("");

  // const handleJoin = (username) => {
  //   setIsJoined(true);
  //   setUsername(username);
  // }
  let navigate = useNavigate();
  const goToGlobalChat = () => {
    navigate("/global");
  }

  const goToRoomChat = () => {
    navigate("/room");
  }

  const goToVideoChat = () => {
    navigate("/video");
  }
  return (
    // <>
      // {isJoined ? <Chat username={username}/> : <Connect onJoin={handleJoin} />} 
    //  </> 
    <div className="card">
      <a href="https://github.com/aayushxrj/gochat" target="_blank">
          <img src={goLogo} className="logo" alt="Go logo" />
      </a>
      <br />
      
      <div className="button-container">
        <div className="button-row">
          <button onClick={goToRoomChat}>Rooms</button>
          <button onClick={goToVideoChat}>Video </button>
        </div>
        <br />
        <button onClick={goToGlobalChat} className="global-chat-button">Global Chat</button>
      </div>

    </div>
  )
}

export default App;
