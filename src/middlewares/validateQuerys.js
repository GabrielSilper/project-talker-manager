const FormatJS = require('formatjs');

const formatJS = new FormatJS();
const { readTalkerJson } = require('../utils/crudFileFunctions');

async function validateQuerysFields(req, res, next) {
  const { q, rate, date } = req.query;
  const talkers = await readTalkerJson();
  if (!q && !rate && !date) {
    return res.status(200).json(talkers);
  }
  return next();
}

function validateQuerysRate(req, res, next) {
  const { rate } = req.query;

  const isRateOk = Number(rate) >= 1 && Number(rate) <= 5 && Number(rate) % 1 === 0;
  if (rate && !isRateOk) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  return next();
}

function validateQuerysDate(req, res, next) {
  const { date } = req.query;
  const isDateOk = formatJS.test(date, 'DD/MM/YYYY');
  if (date && !isDateOk) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  return next();
}

module.exports = {
  validateQuerysFields,
  validateQuerysRate,
  validateQuerysDate,
};
