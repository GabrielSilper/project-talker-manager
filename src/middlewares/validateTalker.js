const FormatJS = require('formatjs');

const formatJS = new FormatJS();

function validateTalkerFields(req, res, next) {
  const { name, age, talk } = req.body;
  // Verificando se todos os campos necessários estão vindo no body.
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

// Tive que fazer mais duas funções, pois o lint não permiti funções com mais de 20 linhas.
function validatePropertyTalkFields(req, res, next) {
  // Vou verificar se os campos watchedAt e rate existem
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
  // Verifica se o a data e a nora são válidas.
  const { talk: { watchedAt, rate } } = req.body;
  // Uso da lib FormatJS para verificar formato de datas. link => https://www.npmjs.com/package/formatjs
  // Verificando se a data está vindo correta no fornmato dd/mm/yyyy
  const isWatchedAtOk = formatJS.test(watchedAt, 'DD/MM/YYYY');
  if (!isWatchedAtOk) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
  // Verifica se a nota está entre 1 e 5, e também se é um inteiro.
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

  // Verifica se o campo e-mail possui um nome válido.
  if (!isNameOk) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
  // Verifica se existe o campo age.
  if (!isAgeOk) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
  // Caso tudo esteja certo, vai para o próximo middleware.
  return next();
}

module.exports = {
  validateTalkerContents,
  validateTalkerFields,
  validatePropertyTalkFields,
  validatePropertyTalkContents,
};
