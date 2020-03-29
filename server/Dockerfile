FROM node:current-slim

WORKDIR /app/server

COPY package*.json ./

RUN npm install

EXPOSE 5000

COPY . .

CMD ["node", "index.js"]