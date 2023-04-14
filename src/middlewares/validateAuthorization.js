const validateAuthorization = (req, res, next) => {
  const { authorization } = req.headers;
  
  // Verifica se o campo authorization existe nos headers.
  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  // Verifica se o campo authorization não possui 16 letras.
  if (authorization.length !== 16) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }
  return next();
};

module.exports = validateAuthorization;
