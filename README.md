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

Now you can get the app up and running. You can do this either by running it locally on your machine or via [Docker](https://www.docker.com/) or within a [GitHub Codespace](https://github.com/features/codespaces).

### Local Usage

To get started with GoChat, you need to have Go and Node.js installed on your machine. Go is used for running the backend server, and Node.js is used for managing frontend dependencies and running the development server.

1. Install Prerequisites

- [Go](https://go.dev/) (1.22.2 or later)
- [Node.js](https://nodejs.org/en) (19.8.1 or later)

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

### Docker Usage

If you have Docker installed and running, you can also run the application using Docker. Follow these steps:

#### Using Docker Compose

Directly pull and run from Docker Hub (recommended):

```
docker-compose up
```

or Build and run the Docker image locally:

```
docker-compose up --build
```

You can access the app at `http://localhost:5173/`

### GitHub Codespaces Usage

If you're running this inside a GitHub Codespace, follow these steps to get the app up and running:

1. Execute the following command in the terminal to get the Codespace name:

```
export $CODESPACE_NAME
```

2. Copy the output and add it to the .env file in the root directory of the project. Your dotenv file should look like this:

```
VITE_CODESPACE_NAME=your_codespace_name
```

3. Build and run the Docker image:

```
docker-compose up --build
```

You can then access the app at `https://your_codespace_name-5173.app.github.dev/`

### Kubernetes Usage

To run GoChat using Kubernetes locally, you'll need to install a few prerequisites and use Minikube to create a local cluster with multiple nodes.

#### 1. Install Prerequisites

- [kubectl](https://kubernetes.io/docs/tasks/tools/) (Kubernetes CLI)
- [Minikube](https://minikube.sigs.k8s.io/docs/start/) (1.32.0 or later)

Ensure virtualization is enabled on your system (e.g., Hyper-V, VirtualBox, or Docker driver installed).

#### 2. Start a Minikube Cluster with 2 Nodes

Start Minikube with 2 nodes using:

```
minikube start --nodes=2
```

**Optional (for WSL/Windows users):** Start Minikube with Docker driver and custom resources:

```
minikube start --nodes=2 --driver=docker --cpus=2 --memory=2200
```

You can verify the nodes are running with:

```
kubectl get nodes
```

#### 3. Deploy the Application
Navigate to the root of the project and apply the Kubernetes manifests:

```
kubectl apply -f kubernetes/
```
This will create:

1. Deployments for frontend and backend

2. Services to expose them

3. Horizontal Pod Autoscalers (HPA)

4. (Optional) Vertical Pod Autoscalers (VPA), if CRDs are installed

#### 4. Access the Application
Expose the frontend service using Minikube:

```
minikube service frontend-service
```

This will open the app in your default browser.

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
