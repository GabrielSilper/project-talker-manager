const express = require('express');
const randomToken = require('../utils/randomToken');
const { validateFields, validateContents } = require('../middlewares/validateLogin');

const loginRoutes = express.Router();

loginRoutes.use(validateFields);
loginRoutes.use(validateContents);

loginRoutes.post('/', (req, res) => {
  // const { email, password } = req.body;
  res.status(200).json({
    token: randomToken(),
  });
});

module.exports = loginRoutes;
