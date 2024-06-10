import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import GlobalChat from './components/GlobalChat.jsx'
import RoomChat from './components/RoomChat.jsx'
import VideoChat from './components/VideoChat.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/global" element={<GlobalChat />} />
        <Route path="/room/" element={<RoomChat />} />
        <Route path="/video" element={<VideoChat />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
