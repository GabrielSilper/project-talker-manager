const express = require('express');
const {
  readTalkerJson,
  writeTalkerJson,
  addTalkerJson,
  deleteTalkerJson,
  getTalkerJson,
  filterTalkerJson,
  updateRateJson,
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

// Todos os imports estão acima, está linha é só pra separar um pouco e mostrar que as rotas estão abaixo.

const talkerRoutes = express.Router();

// Vai mostrar todos os talkers.
talkerRoutes.get('/', async (req, res) => {
  const talkers = await readTalkerJson();
  return res.status(200).json(talkers);
});

// Vai mostrar todos os talkers, porém vindo do banco de dados.
talkerRoutes.get('/db', async (req, res) => {
  const result = await getAllTalkers();
  res.status(200).json(result);
});

// Vai mostrar um talker pelo ID.
talkerRoutes.get('/:id', validateTalkerId, async (req, res, next) => {
  const { id } = req.params;
  if (Number(id) >= 0) {
    const foundTalker = await getTalkerJson(id);
    return res.status(200).json(foundTalker);
  }
  return next();
});

// Abaixo desse middleware serão feito as rotas que necessitam de token pra funcionar.
talkerRoutes.use(validateAuthorization);

// Vai deletar um talker
talkerRoutes.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await deleteTalkerJson(id);
  res.status(204).end();
});

// Vai filtrar os talkers baseado nas minhas querys
const midArray = [validateQuerysFields, validateQuerysRate, validateQuerysDate];
talkerRoutes.get('/search', midArray, async (req, res) => {
  const filteredTalkers = await filterTalkerJson(req.query);
  return res.status(200).json(filteredTalkers);
});

// Atualizar a nota de um talker existente
talkerRoutes.patch('/rate/:id', validatePatchRate, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  await updateRateJson(id, rate);
  return res.status(204).end();
});

// Abaixo desses middlewares são o que precisam da validações dos campos
talkerRoutes.use(validateTalkerFields);
talkerRoutes.use(validatePropertyTalkFields);
talkerRoutes.use(validatePropertyTalkContents);
talkerRoutes.use(validateTalkerContents);

// Vai cadastrar um novo talker
talkerRoutes.post('/', async (req, res) => {
  const talker = req.body;
  const newTalker = await addTalkerJson(talker);
  res.status(201).json(newTalker);
});

// Vai atualizar um talker existente
talkerRoutes.put('/:id', validateTalkerId, async (req, res) => {
  const { id } = req.params;
  const talkerEdit = req.body;
  const talkers = await readTalkerJson();
  const talkerPosition = talkers.findIndex(
    (talker) => talker.id === Number(id),
  );
  talkers[talkerPosition] = { id: Number(id), ...talkerEdit };

  await writeTalkerJson(talkers);

  res.status(200).json({ id: Number(id), ...talkerEdit });
});

module.exports = talkerRoutes;
