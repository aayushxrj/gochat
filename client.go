package main

import (
	"github.com/gorilla/websocket"
)

type Client struct {
	username string
	manager *Manager
	conn *websocket.Conn
	send chan []byte
}

