FROM node:19.8.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --production

EXPOSE 5173

CMD ["npm", "run", "dev"]

# docker build -t aayushxrj/gochat-frontend .
# docker run --name gochat-frontend -p 5173:5173 aayushxrj/gochat-frontend
# docker run -it aayushxrj/gochat-frontend /bin/bash