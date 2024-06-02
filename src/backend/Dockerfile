FROM golang:1.22.2

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main .

EXPOSE 8080

CMD [ "./main" ]

# docker build -t aayushxrj/gochat-backend .
# docker run --name gochat-backend -p 8080:8080 aayushxrj/gochat-backend
# docker run -it aayushxrj/gochat-backend /bin/bash