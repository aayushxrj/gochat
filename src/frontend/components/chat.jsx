import React, { useState, useEffect, useRef } from 'react';
import Input from './input.jsx';
import Message from './message.jsx';

function Chat({ username }) {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const [userColors] = useState(() => new Map());

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/ws?username=" + encodeURIComponent(username));

        socket.onopen = () => {
            console.log('WebSocket connection opened');
            socketRef.current = socket;
        };

        socket.onmessage = (event) => {
            const incomingMessage = JSON.parse(event.data);
            console.log('Received message:', incomingMessage);
            setMessages((prevMessages) => {
                const isMessageExist = prevMessages.some((message) => message.text === incomingMessage.text);
        
                if (!isMessageExist) {
                    return [...prevMessages, incomingMessage];
                }
        
                return prevMessages;
            });
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed', event);
            socketRef.current = null;
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const handleMessageSubmit = (messageText) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            const message = { username, text: messageText };
            console.log('Sending message:', message);
            socketRef.current.send(JSON.stringify(message));        
        } else {
            console.error('WebSocket is not open. Unable to send message.');
        }
    };

    return (
        <div className="chat-card">
            <h4>
                Connected as {username}
                <span style={{ display: 'inline-block', marginLeft: '10px', height: '10px', width: '10px', backgroundColor: 'green', borderRadius: '50%' }}></span>
            </h4>



            {/* {socketRef.current && socketRef.current.readyState === WebSocket.OPEN ? 
            <h4>Connected as {username}</h4> : 
            <h4>Disconnected</h4>}  */}

            <div className="messages">
            {messages.map((messageInfo, index) => {
                // If this user doesn't have a color yet, generate one
                if (!userColors.has(messageInfo.username)) {
                    userColors.set(messageInfo.username, '#' + Math.floor(Math.random()*16777215).toString(16));
                }

                // Pass the color to the Message component
                return <Message key={index} messageInfo={messageInfo} color={userColors.get(messageInfo.username)} />;
            })}
            </div>
            
            <Input onSubmit={handleMessageSubmit} />
        </div>
    );
}

export default Chat;