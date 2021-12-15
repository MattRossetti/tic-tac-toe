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
  const playAgainPrompt = document.getElementById('play-again-prompt');
  const playAgainYes = document.getElementById('play-again-yes');
  const playAgainNo = document.getElementById('play-again-no');
  const playerOneScore = document.getElementById('player-one-score');
  const playerTwoScore = document.getElementById('player-two-score')
    
  let playing = true;

  const xMarkedSquares = [];
  const oMarkedSquares = [];
  let totalMoves = 0;
  
  let playerTurn = 1;


  
  const player1MoveText = 'player 1, please make your move'
  let player2MoveText = 'player 2, please make your move'
  
  const gameBoardSize = 3;
  let turnMarker = 'X';

  const setScores = () => {
    playerOneScore.textContent = `Player 1 wins: ${player1.getWins()}`
    playerTwoScore.textContent = `player 2 wins: ${player2.getWins()}`
  }
  
  const playAgain = () => {
    gameBoard.clearDisplay();
    setScores();
    playing = true;
    turnIndicatorContainer.textContent = player1MoveText;
    playAgainPrompt.classList.add('hidden')
  } 
  
  const dontPlayAgain = () => {
    window.location.reload()
  }
  
  playAgainYes.addEventListener('click', playAgain);
  playAgainNo.addEventListener('click', dontPlayAgain)

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
      playing = false;
      return true
    }
  }

  const updateMoveArrays = (turnMarker, squareId) => {
    if (turnMarker === 'X') xMarkedSquares.push(parseInt(squareId));
    else oMarkedSquares.push(parseInt(squareId));
  }

  const checkForWin = () => {
    const win_conditions = [
      // horizontal win conditions:
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // vertical win conditions:
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal win conditions:
      [0, 4, 8],
      [6, 4, 2]
    ]

    for (let i = 0; i < win_conditions.length; i++) {
      let xCounter = 0;
      let oCounter = 0;
      for (let j = 0; j < win_conditions[i].length; j++) {
        if (xMarkedSquares.includes(win_conditions[i][j])) xCounter++;
        if (oMarkedSquares.includes(win_conditions[i][j])) oCounter++;
      }
      if (xCounter === 3) return player1;
      if (oCounter === 3) return player2;
    }
  }

  const handleWinner = (winner) => {
    if (winner === undefined) return
    playing = false
    winner.incrementWins();
    let winner_name = ''
    if (winner === player1) winner_name = 'Player 1'
    else winner_name = 'player 2'
    turnIndicatorContainer.textContent = `Congratulations ${winner_name}, you have won!`
    setScores();
    askToPlayAgain();
  }

  const handleTie = () => {
    turnIndicatorContainer.textContent = 'You two are equally matched! That Game was a Tie!'
    playing = false;
    askToPlayAgain();
  }

  const askToPlayAgain = () => {
    playAgainPrompt.classList.remove('hidden')
  }

  const markSquare = (e) => {
    if (e.target.textContent != '') return showInvalidMoveError()
    if (playing === false) return
    clearMoveErrorMessage();
    e.target.textContent = `${turnMarker}`;
    const squareID = e.target.getAttribute('data-squareID')
    updateMoveArrays(turnMarker, squareID);
    nextPlayerTurn();
    totalMoves++;
    let tie = checkForTie(totalMoves);
    if (tie) handleTie();
    let winner = checkForWin();
    return handleWinner(winner);
  }

  const clearDisplay = () => {
    squares = gameBoardContainer.children;
    for (let i = 0; i < squares.length; i++) {
      squares[i].textContent = ''
    }
    totalMoves = 0;
    while (xMarkedSquares.length > 0) xMarkedSquares.pop();
    while (oMarkedSquares.length > 0) oMarkedSquares.pop();
    turnMarker = 'X'
    console.log(xMarkedSquares.length, oMarkedSquares.length);
    playerTurn = 1;
  }

  const createDisplay = () => {
    gameBoard.clearDisplay();
    gameAreaContainer.classList.remove('hidden');
    turnIndicatorContainer.textContent = player1MoveText;
    setScores();
    for (let i = 0; i < Math.pow(gameBoardSize, 2); i++) {
      const square = document.createElement('div');
      square.classList.add('board-square');
      square.setAttribute("data-squareID", i)
      square.addEventListener('click', (e) => markSquare(e));
      gameBoardContainer.appendChild(square);
    }
  }

  const showInvalidMoveError = () => {
    if (playing === false) return
    invalidMoveError.classList.remove('hide-error');
  }

  const clearMoveErrorMessage = () => {
    invalidMoveError.classList.add('hide-error')
  }

  return {createDisplay, clearDisplay}
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

// gameBoard.createDisplay()
