const fs = require('fs/promises');
const path = require('path');

async function readTalkerJson() {
  const data = await fs.readFile(path.resolve(__dirname, '../talker.json'));
  return JSON.parse(data);
}

module.exports = { readTalkerJson };
