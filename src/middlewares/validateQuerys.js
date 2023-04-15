const { readTalkerJson } = require('../utils/crudFileFunctions');

async function validateQuerysFields(req, res, next) {
  const { q, rate } = req.query;
  const talkers = await readTalkerJson();
  if (!q && !rate) {
    return res.status(200).json(talkers);
  }
  return next();
}

function validateQuerysRate(req, res, next) {
  const { rate } = req.query;
  if (rate) {
    const isRateOk = Number(rate) >= 1 && Number(rate) <= 5 && Number(rate) % 1 === 0;
    if (!isRateOk) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
      });
    }
  }
  return next();
}

module.exports = { validateQuerysFields, validateQuerysRate };
