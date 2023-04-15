function validatePatchRate(req, res, next) {
  const { rate } = req.body;
  if (rate === undefined) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  const isRateOk = Number(rate) >= 1 && Number(rate) <= 5 && Number(rate) % 1 === 0;
  if (!isRateOk) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }

  return next();
}

module.exports = validatePatchRate;
