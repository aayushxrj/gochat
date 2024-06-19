import React, { useState,useEffect, useRef } from 'react';
import Video from './video.jsx';

function VideoGallery( { username }) {
    const localVideoRef = useRef(null);
    const [remoteVideos, setRemoteVideos] = useState([]);
    const socketRef = useRef(null);
    const pcRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                }

                const pc = new RTCPeerConnection();
                pcRef.current = pc;
                stream.getTracks().forEach(track => pc.addTrack(track, stream));

                pc.ontrack = event => {
                    if (event.track.kind === 'video') {
                      setRemoteVideos(prevVideos => [...prevVideos, event.streams[0]]);
                    }
                };

                const socket = new WebSocket("ws://localhost:8082/websocket");
        
                socket.onopen = () => {
                    console.log('WebSocket connection opened');
                    socketRef.current = socket;
                };

                pc.onicecandidate = e => {
                    if (e.candidate) {
                      socket.send(JSON.stringify({ event: 'candidate', data: JSON.stringify(e.candidate) }));
                    }
                };
                

                socket.onmessage = (event) => {
                    const message = JSON.parse(event.data);
                    console.log('Received message:', message); // debug
                    switch (message.event) {
                        case 'offer':
                          const offer = JSON.parse(message.data);
                          pc.setRemoteDescription(offer);
                          pc.createAnswer().then(answer => {
                            pc.setLocalDescription(answer);
                            socket.send(JSON.stringify({ event: 'answer', data: JSON.stringify(answer) }));
                          });
                          break;
                        case 'candidate':
                          const candidate = JSON.parse(message.data);
                          pc.addIceCandidate(candidate);
                          break;
                        default:
                          console.log('Unhandled message', message);
                      }
                };

                socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };
                socket.onclose = (event) => {
                    console.log('WebSocket connection closed', event);
                    socketRef.current = null;
                };

            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
            });

        
        return () => {
            if (pcRef.current) {
                pcRef.current.close();
            }
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    return (
        <div className='video-container'> 
            <div className="local-video">
                <Video videoRef={localVideoRef} username={username}/>
            </div>
            <div className="remote-videos">
                {remoteVideos.map((stream, index) => (
                    <video key={index} autoPlay controls srcObject={stream} width="160" height="120"></video>
                ))}
            </div>
        </div>
    );
}

export default VideoGallery;