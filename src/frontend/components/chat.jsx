import React, { useState, useEffect, useRef } from 'react';
import Input from './input.jsx';
import Message from './message.jsx';

function Chat({ username }) {
    const [messages, setMessages] = useState([]);
    const socketRef = useRef(null);
    const [userColors] = useState(() => new Map());

    const codespaceName = import.meta.env.VITE_CODESPACE_NAME

    useEffect(() => {
        
        // const socket = new WebSocket("ws://localhost:8080/ws?username=" + encodeURIComponent(username));
        // const socket = new WebSocket("wss://verbose-space-spoon-jj5w6g99qgwf5vgv-8080.app.github.dev/ws?username=" + encodeURIComponent(username));

        let websocketUrl;
        if (!codespaceName) {
            websocketUrl = "ws://localhost:8080/ws?username=" + encodeURIComponent(username);
        } else {
            websocketUrl = "wss://" + codespaceName + "-8080.app.github.dev/ws?username=" + encodeURIComponent(username);
        }
        const socket = new WebSocket(websocketUrl);

        socket.onopen = () => {
            console.log('WebSocket connection opened');
            socketRef.current = socket;
        };

        // TO AVOID DUPLICATE RECEIVING MESSAGE ISSUE

        // check if the message is already in the messages array
        // socket.onmessage = (event) => {
        //     const incomingMessage = JSON.parse(event.data);
        //     console.log('Received message:', incomingMessage);
        //     setMessages((prevMessages) => {
        //         const isMessageExist = prevMessages.some((message) => message.text === incomingMessage.text);
        
        //         if (!isMessageExist) {
        //             return [...prevMessages, incomingMessage];
        //         }
        
        //         return prevMessages;
        //     });
        // };

        // checks if last message is not the same as the incoming message
        socket.onmessage = (event) => {
            const incomingMessage = JSON.parse(event.data);
            console.log('Received message:', incomingMessage);
            setMessages((prevMessages) => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                const isMessageSameAsLast = lastMessage && lastMessage.text === incomingMessage.text;
        
                if (!isMessageSameAsLast) {
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

            <div className="messages">
            {messages.map((messageInfo, index) => {
                // If this user doesn't have a color yet, generate one
                if (!userColors.has(messageInfo.username)) {
                    userColors.set(messageInfo.username, '#' + Math.floor(Math.random()*16777215).toString(16));
                }

                const isCurrentUser = messageInfo.username === username;

                // Pass the color to the Message component
                return <Message key={index} messageInfo={messageInfo} color={userColors.get(messageInfo.username)} isCurrentUser={isCurrentUser} />;
            })}
            </div>
            
            <Input onSubmit={handleMessageSubmit} />
        </div>
    );
}

export default Chat;