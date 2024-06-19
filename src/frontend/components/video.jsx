import React from 'react';

function Video( { videoRef, username }) {
    return (
        <div className='video-box'>
            <video ref={videoRef} autoPlay playsInline></video>
            <p>{username}</p>
        </div>
    )
}

export default Video;
