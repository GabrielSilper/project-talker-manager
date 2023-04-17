const express = require('express');
const {
  readTalkerJson,
  addTalkerJson,
  deleteTalkerJson,
  getTalkerJson,
  filterTalkerJson,
  updateRateJson,
  updateTalkerJson,
} = require('../utils/crudFileFunctions');
const validateAuthorization = require('../middlewares/validateAuthorization');
const {
  validateTalkerFields,
  validateTalkerContents,
  validatePropertyTalkFields,
  validatePropertyTalkContents,
  validateTalkerId,
} = require('../middlewares/validateTalker');
const {
  validateQuerysFields,
  validateQuerysRate,
  validateQuerysDate,
} = require('../middlewares/validateQuerys');
const validatePatchRate = require('../middlewares/validatePatchRate');
const getAllTalkers = require('../db/dbQuery');

const talkerRoutes = express.Router();

talkerRoutes.get('/', async (req, res) => {
  const talkers = await readTalkerJson();
  return res.status(200).json(talkers);
});

talkerRoutes.get('/db', async (req, res) => {
  const result = await getAllTalkers();
  return res.status(200).json(result);
});

talkerRoutes.get('/:id', validateTalkerId, async (req, res, next) => {
  const { id } = req.params;
  if (Number(id) >= 0) {
    const foundTalker = await getTalkerJson(id);
    return res.status(200).json(foundTalker);
  }
  return next();
});

talkerRoutes.use(validateAuthorization);

talkerRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await deleteTalkerJson(id);
  return res.status(204).end();
});

const midArray = [validateQuerysFields, validateQuerysRate, validateQuerysDate];
talkerRoutes.get('/search', midArray, async (req, res) => {
  const filteredTalkers = await filterTalkerJson(req.query);
  return res.status(200).json(filteredTalkers);
});

talkerRoutes.patch('/rate/:id', validatePatchRate, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  await updateRateJson(id, rate);
  return res.status(204).end();
});

talkerRoutes.use(validateTalkerFields);
talkerRoutes.use(validatePropertyTalkFields);
talkerRoutes.use(validatePropertyTalkContents);
talkerRoutes.use(validateTalkerContents);

talkerRoutes.post('/', async (req, res) => {
  const talker = req.body;
  const newTalker = await addTalkerJson(talker);
  return res.status(201).json(newTalker);
});

talkerRoutes.put('/:id', validateTalkerId, async (req, res) => {
  const { id } = req.params;
  const talkerEdit = req.body;
  const newTalker = await updateTalkerJson(id, talkerEdit);
  return res.status(200).json(newTalker);
});

module.exports = talkerRoutes;
