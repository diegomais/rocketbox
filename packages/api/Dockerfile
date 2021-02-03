FROM node:12-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

ENV API_URL=http://localhost:3333
ENV MONGODB_URI=mongodb://mongodb:27017/rocketbox
ENV PORT=3333

EXPOSE 3333

CMD yarn dev