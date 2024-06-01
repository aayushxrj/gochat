import React from "react";

function Message({ messageInfo }) {
    return (
        <div className="message">
        <p>{messageInfo.username} - {messageInfo.text}</p>
        </div>
    );
}

export default Message;