package main

import (
	"flag"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
)

var addr = flag.String("addr", "localhost:8080", "http service address")

func rootHandler(ctx *gin.Context) {
	ctx.File("./index.html")
}

func main() {
	flag.Parse()

	go NewManager().Run()

	gin.SetMode(gin.ReleaseMode)

	// router := gin.Default()
	router := gin.New() 
    router.Use(gin.Logger()) 
    router.Use(gin.Recovery()) 


	router.GET("/", rootHandler)
	router.GET("/ws", WsHandler)

	fmt.Println("Starting server on", *addr)
	log.Fatal(router.Run(*addr))
}