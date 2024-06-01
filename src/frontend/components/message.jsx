import React from "react";

function Message({ messageInfo, color, isCurrentUser }) {
    const { username, text } = messageInfo;

    const messageClass = isCurrentUser ? 'message-right' : 'message-left';

    return (
        <div className={`message ${messageClass}`} >
            <strong style={{ color }}>{username}</strong>
            <p>
                {text}
            </p>
        </div>
    );
}

export default Message;