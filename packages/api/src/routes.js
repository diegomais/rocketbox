const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.send('Hello Teste');
});

module.exports = routes;