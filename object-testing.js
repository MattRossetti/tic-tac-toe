const createPlayer = () => {
  let wins = 0;
  let playerIsAi = false;
  const incrementWins = () => wins++;
  const getWins = () => wins;
  const assignPlayerType = (input) => playerType = input;
  const getPlayerType = () => playerType;
  const setPlayerToAi = () => playerIsAi = true;
  const isAi = () => playerIsAi;
  return {incrementWins, getWins, assignPlayerType, getPlayerType, setPlayerToAi, isAi}
};

const player1 = createPlayer();
const player2 = createPlayer();