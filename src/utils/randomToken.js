const randomToken = () => {
  const part1 = Math.random().toString(16).substring(3);
  const part2 = Math.random().toString(16).substring(3);
  const token = `${part1}${part2}`.substring(0, 16);
  return token;
};

module.exports = randomToken;
