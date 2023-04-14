const fs = require('fs/promises');
const path = require('path');

async function readTalkerJson() {
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  return JSON.parse(data);
}

async function writeTalkerJson(content) {
  await fs.writeFile(path.resolve(__dirname, '../talker.json'), JSON.stringify(content));
}

module.exports = { readTalkerJson, writeTalkerJson };
