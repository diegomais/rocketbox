FROM node:12-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV REACT_APP_API_URL=http://localhost:3333

EXPOSE 3000

CMD yarn start