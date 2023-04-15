const talkerConnection = require('./talkerConnection');

const getAllTalkers = async () => {
  const [result] = await talkerConnection.execute(
    'SELECT * FROM TalkerDB.talkers;',
  );
  const newResult = result.map((talker) => {
    const { name, age, id, talk_watched_at: watchedAt, talk_rate: rate } = talker;
    const newTalker = {
      name,
      age,
      id,
      talk: {
        watchedAt,
        rate,
      },
    };
    return newTalker;
  });
  return newResult;
};

module.exports = getAllTalkers;
