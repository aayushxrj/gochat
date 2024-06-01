import React from 'react';  

function Chat({ username }) {
    return (
        <div className="card">
            <h1>Connected as {username}</h1>
        </div>
    )
}

export default Chat;