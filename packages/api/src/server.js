const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://rocket_6:4HvM61X3CSGCTrep@rocketbox-4tvjd.mongodb.net/omnistack?retryWrites=true', {
  useNewUrlParser: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

app.listen(3333);