import React, { useState } from "react";

function Input({ onSubmit }) {
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setMessage(event.target.value);
    };

    const handleClick = () => {
        if (message.trim()) {
            onSubmit(message);
            setMessage(''); 
        }
    };

    return (
        <div className="inputDiv">
            <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={handleChange}
                id="inputMessage"
            />
            <button onClick={handleClick}>Send</button>
        </div>
    );
}

export default Input;