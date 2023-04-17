const FormatJS = require('formatjs');
const { readTalkerJson } = require('../utils/crudFileFunctions');

const formatJS = new FormatJS();

function validateTalkerFields(req, res, next) {
  const { name, age, talk } = req.body;
  if (!name) {
    return res.status(400).json({
      message: 'O campo "name" é obrigatório',
    });
  }
  if (!age) {
    return res.status(400).json({
      message: 'O campo "age" é obrigatório',
    });
  }
  if (!talk) {
    return res.status(400).json({
      message: 'O campo "talk" é obrigatório',
    });
  }
  return next();
}

function validatePropertyTalkFields(req, res, next) {
  const {
    talk: { watchedAt, rate },
  } = req.body;

  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }

  if (rate === undefined) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }
  return next();
}

function validatePropertyTalkContents(req, res, next) {
  const {
    talk: { watchedAt, rate },
  } = req.body;
  const isWatchedAtOk = formatJS.test(watchedAt, 'DD/MM/YYYY');
  if (!isWatchedAtOk) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  const isRateOk = Number(rate) % 1 === 0 && Number(rate) >= 1 && Number(rate) <= 5;
  if (!isRateOk) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  return next();
}

function validateTalkerContents(req, res, next) {
  const { name, age } = req.body;
  const isNameOk = name.length > 2;
  const isAgeOk = Number(age) >= 18 && Number(age) % 1 === 0;

  if (!isNameOk) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  if (!isAgeOk) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  return next();
}

async function validateTalkerId(req, res, next) {
  const { id } = req.params;
  const talkers = await readTalkerJson();
  const foundTalker = talkers.find((talker) => talker.id === Number(id));
  if (Number(id) >= 0 && !foundTalker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return next();
}

module.exports = {
  validateTalkerContents,
  validateTalkerFields,
  validatePropertyTalkFields,
  validatePropertyTalkContents,
  validateTalkerId,
};
