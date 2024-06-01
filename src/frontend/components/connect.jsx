import React, { useState } from "react";
import goLogo from './../assets/goChatLogo.svg'

function Connect({ onJoin }) {
  const [username, setUsername] = useState("");

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleClick = () => {
    if (username.trim() !== "") {
        onJoin(username);
    } else {
        alert("Please enter a username");
    }
  }

  return (
    <div className="card">
      <div>
        <a href="https://github.com/aayushxrj/gochat" target="_blank">
          <img src={goLogo} className="logo" alt="Go logo" />
        </a>
      </div>

      <div>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={handleInputChange}
        />
        <br />
        <button onClick={handleClick}>
          Join
        </button>
      </div>
    </div>
  );
}

export default Connect;