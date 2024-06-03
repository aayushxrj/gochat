package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

var addr = flag.String("addr", ":8080", "http service address")

// for checking if the websocket server is working
// func rootHandler(ctx *gin.Context) {
// 	ctx.File("./tests/index.html")
// }

func main() {
	flag.Parse()

	manager := NewManager()
	go manager.Run()

	gin.SetMode(gin.ReleaseMode)

	// router := gin.Default()
	router := gin.New() 
    router.Use(gin.Logger()) 
    router.Use(gin.Recovery()) 


    // for checking if the websocket server is working
	// router.GET("/", rootHandler)

	router.GET("/ws", func(ctx *gin.Context) {
		WsHandler(manager, ctx)
	})

	fmt.Println("Starting server on", *addr)
	log.Fatal(router.Run(*addr))
}