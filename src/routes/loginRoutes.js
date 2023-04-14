const express = require('express');
const randomToken = require('../utils/randomToken');

const loginRoutes = express.Router();

loginRoutes.post('/', (req, res) => {
  // const { email, password } = req.body;
  res.status(200).json({
    token: randomToken(),
  });
});

module.exports = loginRoutes;
