import React, { useState } from 'react';
import Connect from './connect.jsx'
import VideoGallery from './videoGallery.jsx'
import './VideoChat.css';

const VideoChat = () => {
    const [isJoined, setIsJoined] = useState(false);

    const [username, setUsername] = useState("");

    const handleJoin = (username) => {
        setIsJoined(true);
        setUsername(username);
    }

    return (
        <>
            {isJoined ? <VideoGallery username={username}/> : <Connect onJoin={handleJoin} />}
        </>
    )
};

export default VideoChat;