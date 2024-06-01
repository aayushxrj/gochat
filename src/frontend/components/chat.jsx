import React, { useState, useEffect, useRef } from 'react';
import Input from './input.jsx';
import Message from './message.jsx';

function Chat({ username }) {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/ws?username=" + encodeURIComponent(username));

        socket.onopen = () => {
            console.log('WebSocket connection opened');
            socketRef.current = socket;
        };

        socket.onmessage = (event) => {
            const incomingMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, incomingMessage]);
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
    }, [username]);

    const handleMessageSubmit = (messageText) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            const message = { username, text: messageText };
            socketRef.current.send(JSON.stringify(message));
            setMessages((prevMessages) => [...prevMessages, message]);
        } else {
            console.error('WebSocket is not open. Unable to send message.');
        }
    };

    return (
        <div className="card">
            <h4>Connected as {username}</h4>
            <div className="messages">
                {messages.map((messageInfo, index) => (
                    <Message key={index} messageInfo={messageInfo} />
                ))}
            </div>
            <Input onSubmit={handleMessageSubmit} />
        </div>
    );
}

export default Chat;