const express = require("express");
const { readTalkerJson } = require("../utils/crudFileFunctions");

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
    } else {
      return res.status(200).json(foundTalker);
    }
  }else {
    next();
  }
});

module.exports = talkerRoutes;
