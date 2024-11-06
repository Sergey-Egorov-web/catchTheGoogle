import { EVENTS } from "./EVENT.js";
import { GAME_STATUSES } from "./GAME_STATUSES.js";
import { MOVE_DIRECTIONS } from "./MOVE_DIRECTIONS.js";

// Data Base
const _state = {
  status: GAME_STATUSES.SETTINGS,
  settings: {
    gridSize: {
      rowsCount: 4,
      columnsCount: 4,
    },
    pointsToWin: 5,
    pointsToLose: 5,
  },
  positions: {
    google: { x: 0, y: 0 },
    player1: { x: 0, y: 0 },
    player2: { x: 2, y: 2 },
  },
  points: {
    google: 0,
    player1: 0,
    player2: 0,
  },

  image: {
    google: "../ui/sources/image/google-color.png",
    player1: "../ui/sources/image/person1-running.png",
    player2: "../ui/sources/image/person2-running.png",
  },
  playerName: {
    google: "Google",
    player1: "Player1",
    player2: "Player2",
  },

  sounds: {
    googleWin: "/ui/sources/sound/googleWin.wav",
    playerWin: "/ui/sources/sound/playerWin.wav",
  },
  winner: null,
  timeToWin: null,
};

let _observers = [];

/**
 * Создается объект `event`, который содержит два свойства:
 * `type`: Тип события, переданный в функцию `_notify`.
 * `payload`: Данные, связанные с событием, переданные в функцию `_notify`.
 * Если данные не переданы, используется пустой объект `{}`.
 */

function _notify(type, payload = {}) {
  const event = {
    type,
    payload,
  };
  _observers.forEach((cc) => cc(event));
}
/**
 *   функция подписки, функция callback подписывается на событие и
 * добавляется в массив наблюдателей
 */

export function subscribe(callback) {
  _observers.push(callback);

  window._observers = _observers;

  return () => {
    unsubscribe(callback); // возвращает йункцию отписки
  };
}

// функция отписки

export function unsubscribe(callback) {
  _observers = _observers.filter((o) => o !== callback);

  window._observers = _observers;
}

// getter / selector
export function getStatus() {
  return _state.status;
}

export function getGridSize() {
  return _state.settings.gridSize;
}

export function getGooglePosition() {
  return _state.positions.google;
}

export function getPlayerPosition(playerNumber) {
  return _state.positions["player" + playerNumber];
}

// setter / command / mutation / action
/**
 * нужно вызвать, чтоб игра запустилась: игроки будут расставлены случайным образом
 * на гриде, гугл будет по интервалу прыгать
 */
export function startGame() {
  _state.status = GAME_STATUSES.IN_PROGRESS;
  console.log("Game started");

  _notify(EVENTS.STATUS_CHANGED);
  _teleportGoogle();
  jumpIntervalId = setInterval(_escapeGoogle, 2000);
}

function whoIsWinner(playerNumber) {
  _state.winner = playerNumber;
}

export function getWinner() {
  let winner = _state.winner;
  return winner;
}

let jumpIntervalId;

/**
 *
 * @param {(1,2)} playerNumber
 * @param {('UP!' | 'DOWN!' | 'LEFT!' | 'RIGHT!')} direction
 */
export function movePlayer(playerNumber, direction) {
  // debugger;
  const positionReducers = {
    [MOVE_DIRECTIONS.UP]: (coords) => {
      if (
        (coords.x === getPlayerPosition(1).x &&
          coords.y - 1 === getPlayerPosition(1).y) ||
        (coords.x === getPlayerPosition(2).x &&
          coords.y - 1 === getPlayerPosition(2).y)
      ) {
        return;
      }
      return {
        x: coords.x,
        y: coords.y - 1,
      };
    },
    [MOVE_DIRECTIONS.DOWN]: (coords) => {
      if (
        (coords.x === getPlayerPosition(1).x &&
          coords.y + 1 === getPlayerPosition(1).y) ||
        (coords.x === getPlayerPosition(2).x &&
          coords.y + 1 === getPlayerPosition(2).y)
      ) {
        return;
      }
      return {
        x: coords.x,
        y: coords.y + 1,
      };
    },
    [MOVE_DIRECTIONS.LEFT]: (coords) => {
      if (
        (coords.x - 1 === getPlayerPosition(1).x &&
          coords.y === getPlayerPosition(1).y) ||
        (coords.x - 1 === getPlayerPosition(2).x &&
          coords.y === getPlayerPosition(2).y)
      ) {
        return;
      }

      return {
        x: coords.x - 1,
        y: coords.y,
      };
    },
    [MOVE_DIRECTIONS.RIGHT]: (coords) => {
      if (
        (coords.x + 1 === getPlayerPosition(1).x &&
          coords.y === getPlayerPosition(1).y) ||
        (coords.x + 1 === getPlayerPosition(2).x &&
          coords.y === getPlayerPosition(2).y)
      ) {
        return;
      }

      return {
        x: coords.x + 1,
        y: coords.y,
      };
    },
  };

  const reducer = positionReducers[direction];
  const newCoords = reducer(_state.positions["player" + playerNumber]);

  if (!_isInsideGrid(newCoords)) {
    return;
  }
  let prevPosition = { ..._state.positions["player" + playerNumber] };
  _state.positions["player" + playerNumber] = newCoords;

  if (_isPlayerInOnePositionWithGoogle(playerNumber)) {
    _catchGoogle(playerNumber);
  }

  _notify(EVENTS.PLAYER_MOVED, {
    newPosition: { ...newCoords },
    prevPosition: prevPosition,
    playerNumber: playerNumber,
  });
}

function _isPlayerInOnePositionWithGoogle(playerNumber) {
  const playerPosition = _state.positions["player" + playerNumber];
  const googlePosition = getGooglePosition();

  return (
    playerPosition.x === googlePosition.x &&
    playerPosition.y === googlePosition.y
  );
}

function _catchGoogle(playerNumber) {
  _state.points["player" + playerNumber]++;
  _notify(EVENTS.GOOGLE_WAS_CAUGHT);
  clearInterval(jumpIntervalId); // чтобы после поимки Google таймер запустился опять, мы его обнуляем
  jumpIntervalId = setInterval(_escapeGoogle, 2000); // и запускаем заново
  if (_state.points["player" + playerNumber] === _state.settings.pointsToWin) {
    _state.status = GAME_STATUSES.WIN;
    whoIsWinner(playerNumber);
    _notify(EVENTS.GAME_END);
    _notify(EVENTS.STATUS_CHANGED);
    console.log("GAME_END");
    clearInterval(jumpIntervalId);
    return; //___________________________________________________________________________________________
  }
  _teleportGoogle();
}

function _isInsideGrid(coords) {
  const isInsideGrid =
    coords.x >= 0 &&
    coords.x < _state.settings.gridSize.columnsCount &&
    coords.y >= 0 &&
    coords.y < _state.settings.gridSize.rowsCount;

  return isInsideGrid;
}

//JSDOC
/**
 * эта функция вызывается когда гугл убежал, то есть его никто не поймал и он по таймеру прыгнул,
 * если при этом он набрал количество равное pointsToLose, то Goodle WIN
 */
function _escapeGoogle() {
  _notify(EVENTS.GOOGLE_ESCAPED);
  console.log("GOOGLE_ESCAPED");
  _state.points.google++;

  if (_state.points.google === _state.settings.pointsToLose) {
    _state.status = GAME_STATUSES.LOSE;
    _notify(EVENTS.GAME_END);
    _notify(EVENTS.STATUS_CHANGED);
    clearInterval(jumpIntervalId);
    return;
  }
  _teleportGoogle();
}

function _teleportGoogle() {
  const newX = _getRandomInt(getGridSize().columnsCount);
  const newY = _getRandomInt(getGridSize().rowsCount);

  if (
    (newX === getGooglePosition().x && newY === getGooglePosition().y) ||
    (newX === getPlayerPosition(1).x && newY === getPlayerPosition(1).y) ||
    (newX === getPlayerPosition(2).x && newY === getPlayerPosition(2).y)
  ) {
    _teleportGoogle();
    return;
  }
  const prevPosition = { ..._state.positions.google };
  _state.positions.google.x = newX;
  _state.positions.google.y = newY;
  console.log("GOOGLE_JUMPED");
  _notify(EVENTS.GOOGLE_JUMPED, {
    newPosition: { ..._state.positions.google },
    prevPosition: prevPosition,
  });
}

function _getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function playAgain() {
  resetPoints();
  _state.status = GAME_STATUSES.SETTINGS;
  _notify(EVENTS.STATUS_CHANGED);
}

export function getPoints(player) {
  if (player === "google") {
    return _state.points.google;
  } else {
    return _state.points["player" + player];
  }
}

export function resetPoints() {
  _state.points.google = 0;
  _state.points.player1 = 0;
  _state.points.player2 = 0;
}

export function setRowsCounter(rowsCount) {
  _state.settings.gridSize.rowsCount = rowsCount;
}

export function getRowsCounter() {
  return _state.settings.gridSize.rowsCount;
}

export function setColumnsCounter(columnsCount) {
  _state.settings.gridSize.columnsCount = columnsCount;
}

export function getColumnsCounter() {
  return _state.settings.gridSize.columnsCount;
}

export function getPlayerImage(player) {
  if (player === "google") {
    return _state.image.google;
  } else {
    return _state.image["player" + player];
  }
}

export function getPlayerName(player) {
  if (player === "google") {
    return _state.playerName.google;
  } else {
    return _state.playerName["player" + player];
  }
}

export function setPlayerName(player, name) {
  _state.playerName["player" + player] = name;
  _notify(EVENTS.PLAYER_NAME_WAS_CHANGED);
}

export function setTimeToWin(time) {
  _state.timeToWin = time;
}

export function getTimeToWin() {
  let time = _state.timeToWin;
  return time;
}

export function getSounds(player) {
  if (player === "google") {
    return _state.sounds.googleWin;
  } else {
    return _state.sounds.playerWin;
  }
}
