const express = require('express');
const { readTalkerJson } = require('../utils/crudFileFunctions');

const talkerRoutes = express.Router();

talkerRoutes.get('/', async (req, res) => {
  const talkers = await readTalkerJson();
  res.status(200).json(talkers);
});

module.exports = talkerRoutes;
