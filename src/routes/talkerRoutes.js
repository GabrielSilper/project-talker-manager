const express = require("express");
const {
  readTalkerJson,
  writeTalkerJson,
} = require("../utils/crudFileFunctions");
const validateAuthorization = require("../middlewares/validateAuthorization");
const {
  validateTalkerFields,
  validateTalkerContents,
  validatePropertyTalkFields,
  validatePropertyTalkContents,
} = require("../middlewares/validateTalker");

const talkerRoutes = express.Router();

talkerRoutes.get("/", async (req, res) => {
  const talkers = await readTalkerJson();
  return res.status(200).json(talkers);
});

talkerRoutes.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readTalkerJson();
  if (Number(id) >= 0) {
    const foundTalker = talkers.find((talker) => talker.id === Number(id));
    if (!foundTalker) {
      return res.status(404).json({
        message: "Pessoa palestrante não encontrada",
      });
    }
    return res.status(200).json(foundTalker);
  }
  // Usei o next por causa da rota "/talkers/search", esse é o porquê de ter um condição nesse trecho, para diferenciar quando for passado um id.
  return next();
});

// Abaixo desse middleware serão feito as rotas que necessitam de token pra funcionar.
talkerRoutes.use(validateAuthorization);

talkerRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalkerJson();

  const talkerPosition = talkers.findIndex(
    (talker) => talker.id === Number(id)
  );

  talkers.splice(talkerPosition, 1);

  await writeTalkerJson(talkers);

  // Usei o end, pois como não ia retornar nada, somente terminei a requisição após a exclusão.
  res.status(204).end();
});

talkerRoutes.get("/search", async (req, res) => {
  const { q } = req.query;
  const talkers = await readTalkerJson();

  if (!q) {
    return res.status(200).json(talkers);
  }

  const result = talkers.filter((talker) => talker.name.includes(q));

  return res.status(200).json(result);
});

// Abaixo desses middlewares são o que precisam da validações dos campos
talkerRoutes.use(validateTalkerFields);
talkerRoutes.use(validatePropertyTalkFields);
talkerRoutes.use(validatePropertyTalkContents);
talkerRoutes.use(validateTalkerContents);

talkerRoutes.post("/", async (req, res) => {
  const talker = req.body;
  const talkers = await readTalkerJson();
  const newTalkers = [...talkers, { id: talkers.length + 1, ...talker }];
  await writeTalkerJson(newTalkers);
  res.status(201).json({ id: talkers.length + 1, ...talker });
});

talkerRoutes.put("/:id", async (req, res) => {
  const { id } = req.params;
  const talkerEdit = req.body;
  const talkers = await readTalkerJson();
  const talkerPosition = talkers.findIndex(
    (talker) => talker.id === Number(id)
  );

  if (talkerPosition < 0) {
    return res.status(404).json({
      message: "Pessoa palestrante não encontrada",
    });
  }

  talkers[talkerPosition] = { id: Number(id), ...talkerEdit };

  await writeTalkerJson(talkers);

  res.status(200).json({ id: Number(id), ...talkerEdit });
});

module.exports = talkerRoutes;
