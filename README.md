# GoChat

GoChat is a real-time chat application built with Go for the backend and React for the frontend. It uses WebSockets for real-time communication between clients and the server.

![Screenshot (767)](https://github.com/aayushxrj/gochat/assets/111623667/2a70f795-ef8b-4cab-8de6-20b6a154b442)

![Screenshot (769)](https://github.com/aayushxrj/gochat/assets/111623667/1216c508-98c2-491d-9bd8-76505dd461dc)

## Quick Start

### Clone the Repository

```
git clone https://github.com/aayushxrj/gochat
```

### Navigate to the Project Directory

```
cd ./gochat/
```

Now you can get the app up and running using either [Docker](https://www.docker.com/) or by running it locally.

### Local Usage

To get started with GoChat, you need to have Go and Node.js installed on your machine. Go is used for running the backend server, and Node.js is used for managing frontend dependencies and running the development server.

1. Install Prerequisites

- Go (1.22.3 or later)
- Node.js (19.8.1 or later)
- npm (9.8.0 or later)

2. Start the backend server

```
cd src/backend/
```
```
go run .
```

3. Start the frontend development server
   
  Open a new terminal session and run:

```
npm install
```
```
npm run dev
```

You can access the app at `http://localhost:5173/`

### Docker Usage (coming soon)

If you have Docker installed and running, you can also run the application using Docker. Follow these steps:

1. Build the Docker image locally:

```

```
or directly pull from Docker Hub (recommended):

```

```

2. Run the Docker container:

```

```

## Using the Application

![Screenshot (768)](https://github.com/aayushxrj/gochat/assets/111623667/6beaf96f-7362-47e7-927e-d4cb9c4ef84b)

- Join the chat
  
When you first open the GoChat application, you will be prompted to enter a username. Enter a username of your choice and click "Join" to enter the chat room.

- Send a message
  
Once in the chat room, you can start typing messages in the input field at the bottom of the screen and click the "Send" button to send a message.

- Receive messages
  
Messages from other users will appear in real-time. You can see who sent each message along with the message content.

## Contributing

Contributions to GoChat are welcome! If you have an idea for an improvement or have found a bug, please open an issue or submit a pull request

## License

GoChat is open-source software licensed under the MIT license.
