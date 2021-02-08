require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

const whitelist = JSON.parse(process.env.WHITELIST);

app.use(cors({ origin: whitelist }));

const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: true, origins: whitelist });

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  });
});

mongoose.connect(
  process.env.MONGODB_URI ||
    'mongodb://mongodb:27017/rocketbox?retryWrites=true',
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);
