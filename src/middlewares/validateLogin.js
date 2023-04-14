const isValidEmail = require('../utils/isValidEmail');

const validateFields = (req, res, next) => {
  const { email, password } = req.body;
  // Verifica se existe o campo e-mail.
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  // Verifica se existe o campo password.
  if (!password) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  // Caso tudo esteja certo, vai para o próximo middleware.
  return next();
};

const validateContents = (req, res, next) => {
  const { email, password } = req.body;
  // Verifica se o campo e-mail possui um e-mail válido.
  const isEmailOk = isValidEmail(email);
  const isPasswordOk = password.length > 5;

  if (!isEmailOk) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  // Verifica se existe o campo password.
  if (!isPasswordOk) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
  // Caso tudo esteja certo, vai para o próximo middleware.
  return next();
};

module.exports = { validateFields, validateContents };
