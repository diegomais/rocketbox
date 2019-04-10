const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = socketIO(server);

io.on('connection', socket => {
  socket.on('connectRoom', box => {
    socket.join(box);
  });
});

mongoose.connect('mongodb+srv://rocket_6:4HvM61X3CSGCTrep@rocketbox-4tvjd.mongodb.net/omnistack?retryWrites=true', {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;

  return next;
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')));

app.use(require('./routes'));

server.listen(3333);