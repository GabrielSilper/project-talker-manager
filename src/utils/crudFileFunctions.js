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

module.exports = { readTalkerJson, writeTalkerJson, addTalkerJson };
