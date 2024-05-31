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

func (c *Client) Read(){}
func (c *Client) Write(){}
