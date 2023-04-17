const fs = require('fs/promises');
const path = require('path');

async function readTalkerJson() {
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  return JSON.parse(data);
}

async function writeTalkerJson(content) {
  await fs.writeFile(
    path.resolve(__dirname, '../talker.json'),
    JSON.stringify(content),
  );
}

async function addTalkerJson(talker) {
  const talkers = await readTalkerJson();
  const newTalkers = [...talkers, { id: talkers.length + 1, ...talker }];
  await writeTalkerJson(newTalkers);
  return { id: talkers.length + 1, ...talker };
}

async function deleteTalkerJson(id) {
  const talkers = await readTalkerJson();
  const talkerPosition = talkers.findIndex(
    (talker) => talker.id === Number(id),
  );
  talkers.splice(talkerPosition, 1);
  await writeTalkerJson(talkers);
}

async function getTalkerJson(id) {
  const talkers = await readTalkerJson();
  const foundTalker = talkers.find((talker) => talker.id === Number(id));
  return foundTalker;
}

async function filterTalkerJson(querys) {
  const talkers = await readTalkerJson();
  let filteredTalkers = [...talkers];
  if (querys.rate) {
    filteredTalkers = filteredTalkers.filter(
      (talker) => talker.talk.rate === Number(querys.rate),
    );
  }
  if (querys.q) {
    filteredTalkers = filteredTalkers.filter((talker) =>
      talker.name.includes(querys.q));
  }
  if (querys.date) {
    filteredTalkers = filteredTalkers.filter(
      (talker) => talker.talk.watchedAt === querys.date,
    );
  }
  return filteredTalkers;
}

async function updateRateJson(id, rate) {
  const talkers = await readTalkerJson();
  const talkerPosition = talkers.findIndex(
    (talker) => talker.id === Number(id),
  );
  talkers[talkerPosition].talk.rate = rate;
  await writeTalkerJson(talkers);
}

module.exports = {
  readTalkerJson,
  writeTalkerJson,
  addTalkerJson,
  deleteTalkerJson,
  getTalkerJson,
  filterTalkerJson,
  updateRateJson,
};
