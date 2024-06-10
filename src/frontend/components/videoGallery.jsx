import React, { useEffect, useRef } from 'react';
import Video from './video.jsx';

function VideoGallery( { username }) {
    const localVideoRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
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
        <div className='video-container'> 
            <div className="local-video">
                <Video videoRef={localVideoRef} username={username}/>
            </div>
            <div className="remote-videos">
                {/* Future: Display remote video streams here */}
            </div>
        </div>
    );
}

export default VideoGallery;