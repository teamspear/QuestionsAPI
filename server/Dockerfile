FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

## Dont need to Exose ports when using docker-compose
# EXPOSE 8080

CMD npm run dev



