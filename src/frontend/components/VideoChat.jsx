import React, { useEffect, useRef } from 'react';

const VideoChat = () => {
    const localVideoRef = useRef(null);

    useEffect(() => {
        // Request access to the user's video and audio
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                // Display the local video stream
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }
            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
            });

        // Future: Setup WebRTC peer connections here
    }, []);

    return (
        <div>
            <h1>Video Chat</h1>
            <video ref={localVideoRef} autoPlay playsInline></video>
            {/* Future: Display remote video streams here */}
        </div>
    );
};

export default VideoChat;