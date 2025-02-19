FROM node:latest

WORKDIR /assistant-bot
COPY package.json .
RUN npm install
COPY . .
CMD npm start