import React, {useState} from "react";
import Connect from './connect.jsx'
import Chat from './chat.jsx'
import './../App.css'

function GlobalChat() {
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

export default GlobalChat;