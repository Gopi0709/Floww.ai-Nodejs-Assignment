FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm rebuild sqlite3 --build-from-source

COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
