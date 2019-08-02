FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

## dont need to expose when using docker-compose
# EXPOSE 8080

CMD npm run dev



