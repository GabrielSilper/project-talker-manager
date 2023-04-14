var FormatJS = require("formatjs");
var formatJS = new FormatJS();

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

function validatePropertyTalk(req, res, next) {
  // Como não coube na função validateTalkerFields, fiz essa pra verificar os campos da propriedade talk que vem no body
  // Vou verificar se os campos watchedAt e rate existem, e também juntei pra ver se são válidos, apesar de gostar separados.
  const {
    talk: { watchedAt, rate },
  } = req.body;

  if (!watchedAt) {
    return res.status(400).json({
      message: 'O campo "watchedAt" é obrigatório',
    });
  }

  if (!rate) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  const isWatchedAtOk = formatJS.test(watchedAt, "DD/MM/YYYY");
  if (!isWatchedAtOk) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }

  return next();
}

// if (!watchedAt) {
//     return res.status(400).json({
//       message: 'O campo "watchedAt" é obrigatório',
//     });
//   }

function validateTalkerContents(req, res, next) {
  const { name, age } = req.body;
  const isNameOk = name.length > 2;
  const isAgeOk = Number(age) >= 18 && Number.isInteger(age);

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
  validatePropertyTalk,
};
