import React from "react";

function Message({ messageInfo, color }) {
    const { username, text } = messageInfo;

    return (
        <div className="message">
            <strong style={{ color }}>{username}</strong>
            <p>
                {text}
            </p>
        </div>
    );
}

export default Message;