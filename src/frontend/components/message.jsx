import React, { useState } from "react";

function Message({ messageInfo }) {
    const { username, text } = messageInfo;

    return (
        <div className="message">
            <strong>{username}</strong>
            <p>
                {text}
            </p>
        </div>
    );
}

export default Message;