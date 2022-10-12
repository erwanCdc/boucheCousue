#syntax=docker/dockerfile:1

FROM node

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "node", "score.js" ]
