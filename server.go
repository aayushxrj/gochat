package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return r.Header.Get("Origin") == "chrome-extension://cbcbkhdmedgianpaifchdaddpnmgnknn"
	},
}

type Manager struct {
	clients     map[*Client] bool // A map of connected clients.
	broadcast   chan []byte               // A channel to broadcast messages to all clients.
	register    chan *Client       // A channel to register new clients.
	unregister  chan *Client       // A channel to unregister clients.
}


func NewManager() *Manager {
	return &Manager{
		clients:    make(map[*Client] bool),
		broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
	}
}

func (s *Manager) Run() {
	fmt.Println("Manager is running successfully...")
}

func WsHandler(ctx *gin.Context) {
	conn, err := upgrader.Upgrade(ctx.Writer, ctx.Request, nil)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer conn.Close()

	fmt.Println("Client connected: ", conn.RemoteAddr())

	for {
		_, _, err := conn.ReadMessage()
		if err != nil {
			fmt.Println("Client disconnected: ", conn.RemoteAddr())
			break
		}

		conn.WriteMessage(websocket.TextMessage, []byte("Hello, client!"))
	}
}