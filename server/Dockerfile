FROM node:10

WORKDIR /usr/src/app

COPY . .

RUN npm install --only=prod

CMD ["npm", "run", "start"]



