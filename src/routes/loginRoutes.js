const express = require('express');
const randomToken = require('../utils/randomToken');
const { validateLoginFields, validateLoginContents } = require('../middlewares/validateLogin');

const loginRoutes = express.Router();

loginRoutes.use(validateLoginFields);
loginRoutes.use(validateLoginContents);

loginRoutes.post('/', (req, res) => {
  // const { email, password } = req.body;
  res.status(200).json({
    token: randomToken(),
  });
});

module.exports = loginRoutes;
