const express = require('express');
const { readTalkerJson, writeTalkerJson } = require('../utils/crudFileFunctions');
const validateAuthorization = require('../middlewares/validateAuthorization');
const {
  validateTalkerFields,
  validateTalkerContents,
  validatePropertyTalkFields,
  validatePropertyTalkContents,
} = require('../middlewares/validateTalker');

const talkerRoutes = express.Router();

talkerRoutes.get('/', async (req, res) => {
  const talkers = await readTalkerJson();
  return res.status(200).json(talkers);
});

talkerRoutes.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readTalkerJson();
  if (Number(id) >= 0) {
    const foundTalker = talkers.find((talker) => talker.id === Number(id));
    if (!foundTalker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return res.status(200).json(foundTalker);
  }
  // Usei o next por causa da rota "/talkers/search", esse é o porquê de ter um condição nesse trecho, para diferenciar quando for passado um id.
  next();
});

// Usei use por enquanto aqui só pra ficar mais legível, porém tenho que saber quais rotas mais precisam dessa verificações.
talkerRoutes.use(validateAuthorization);
talkerRoutes.use(validateTalkerFields);
talkerRoutes.use(validatePropertyTalkFields);
talkerRoutes.use(validatePropertyTalkContents);
talkerRoutes.use(validateTalkerContents);

talkerRoutes.post('/', async (req, res) => {
  const talker = req.body;
  const talkers = await readTalkerJson();
  const newTalkers = [...talkers, { id: talkers.length + 1, ...talker }];
  await writeTalkerJson(newTalkers);
  res.status(201).json({ id: talkers.length + 1, ...talker });
});

module.exports = talkerRoutes;
