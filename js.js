/***** Script for Tic-Tac-Toe  *****/

/* functions */
const gameModeCardClickUpdater = (card) => {
  playerVsAiCard.classList.remove('clicked');
  playerVsPlayerCard.classList.remove('clicked');
  card.classList.add('clicked');
}

const populateGameModeSelectError = () => {
  gameModeSelectError.textContent = '**Please Select a game Mode before starting game**';
}

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

const createGameBoard = () => {
  const gameAreaContainer = document.getElementById('game-area-container');
  const gameBoardContainer = document.getElementById('game-board-container');
  const turnIndicatorContainer = document.getElementById('turn-indicator-container');
  const invalidMoveError = document.getElementById('invalid-move-error');
  const xMarkedSquares = [];
  const oMarkedSquares = [];
  let totalMoves = 0;

  let playerTurn = 1;
  
  const player1MoveText = 'player 1, please make your move'
  let player2MoveText = 'player 2, please make your move'

  const gameBoardSize = 3;
  let turnMarker = 'X';

  
  // setPlayer2MoveTextis called in createDisplay functiion
  const setPlayer2MoveText = (type) => {
    if (type === 'Ai') {
      player2MoveText = 'Please wait while your opponent quickly makes its move'
    }
  }

  const nextPlayerTurn = () => {
    if (playerTurn === 1) {
      turnMarker = 'O';
      playerTurn = 2;
      turnIndicatorContainer.textContent = player2MoveText;
    }
    else {
      turnMarker = 'X';
      playerTurn = 1;
      turnIndicatorContainer.textContent = player1MoveText;
    }
  }

  const checkForTie = (moves) => {
    if (moves === 9) {
      console.log('tie')
    }
  }

  const checkForWin = () => {

  }

  const markSquare = (e) => {
    if (e.target.textContent != '') return showInvalidMoveError()
    clearMoveErrorMessage();
    e.target.textContent = `${turnMarker}`;
    const squareID = e.target.getAttribute('data-squareID')
    console.log(squareID)
    updateMoveArrays(turnMarker, squareID);
    nextPlayerTurn();
    totalMoves++;
    checkForTie(totalMoves);
    checkForWin();

  }

  const createDisplay = ()=> {
    gameAreaContainer.classList.remove('hidden');
    turnIndicatorContainer.textContent = player1MoveText;
    for (let i = 0; i < Math.pow(gameBoardSize, 2); i++) {
      const square = document.createElement('div');
      square.classList.add('board-square');
      square.setAttribute("data-squareID", i)
      square.addEventListener('click', (e) => markSquare(e));
      gameBoardContainer.appendChild(square);
    }
  }

  const showInvalidMoveError = () => {
    invalidMoveError.classList.remove('hide-error');
  }

  const clearMoveErrorMessage = () => {
    invalidMoveError.classList.add('hide-error')
  }

  return {createDisplay}
};

const playerSetup = (gameMode) => {
  if (gameMode === 'playerVsAi') {
    setPlayer2MoveText('Ai');
    player2.setPlayerToAi();
  }
  gameBoard.createDisplay();
}

const startGame = () => {
  let gameMode = ''
  if (playerVsAiCard.classList.contains('clicked')) gameMode = 'playerVsAi'
  if (playerVsPlayerCard.classList.contains('clicked')) gameMode = 'playerVsPlayer'
  if (gameMode === '') {
    return populateGameModeSelectError();
  }
  gameModeSelectContainer.classList.add('hidden');
  playerSetup(gameMode)
}

/* Script */
const player1 = createPlayer();
const player2 = createPlayer();
const gameBoard = createGameBoard();
const playerVsAiCard = document.getElementById('player-vs-ai-card');
const playerVsPlayerCard = document.getElementById('player-vs-player-card');
const gameModeCards = document.querySelectorAll('.game-mode-card');
const startGameButton = document.getElementById('start-game-button');
const gameModeSelectContainer = document.getElementById('game-mode-select-container');
const gameModeSelectError = document.getElementById('game-mode-select-error');

gameModeCards.forEach(card => {
  card.addEventListener('click', () => gameModeCardClickUpdater(card))
});

startGameButton.addEventListener('click', () => {startGame()})

gameBoard.createDisplay()