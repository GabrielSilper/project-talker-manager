const isValidEmail = require('../utils/isValidEmail');

const validateLoginFields = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  return next();
};

const validateLoginContents = (req, res, next) => {
  const { email, password } = req.body;
  const isEmailOk = isValidEmail(email);
  const isPasswordOk = password.length > 5;
  
  if (!isEmailOk) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  if (!isPasswordOk) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  return next();
};

module.exports = { validateLoginFields, validateLoginContents };
