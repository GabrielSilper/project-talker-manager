const express = require("express");
const { readTalkerJson } = require("../utils/crudFileFunctions");
const validateAuthorization = require("../middlewares/validateAuthorization");
const {
  validateTalkerFields,
  validateTalkerContents,
  validatePropertyTalk,
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
  next();
});

// Usei os middlewares no Verbo pois não sei ainda quantos vão precisar de validação do token e do body.
talkerRoutes.post(
  "/",
  validateAuthorization,
  validateTalkerFields,
  validatePropertyTalk,
  validateTalkerContents,
  (req, res) => {
    res.status(201).json({ ok: "ok" });
  }
);

module.exports = talkerRoutes;
