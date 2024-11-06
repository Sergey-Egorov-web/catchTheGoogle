import {
  getPlayerName,
  getPoints,
  getTimeToWin,
  getWinner,
  playAgain,
} from "../state/data.js";
import { timerComponent } from "./game-mode/points-components/timerComponent.js";

export function winMode() {
  const element = document.createElement("div");

  winMode.render(element);

  return { element };
}

winMode.render = (element) => {
  console.log("winMode.render");
  const winnerText = document.createElement("div");
  // let nameWinner = getPlayerName(getWinner());
  winnerText.append(`The ${getPlayerName(getWinner())} is winner`);

  const pointsText = document.createElement("div");
  pointsText.append(`Points: ${getPoints(getWinner())}`);

  const finalTimer = document.createElement("div");
  finalTimer.append(`Time: ${getTimeToWin()}`);

  const playAgainButtonElement = document.createElement("button");
  playAgainButtonElement.append("PLAY AGAIN 🚀");

  // Добавляем обработчик событий для кнопки
  playAgainButtonElement.addEventListener("click", () => {
    playAgain();
  });

  // Добавляем все элементы в контейнер и размещаем их на отдельных строках
  const container = document.createElement("div");
  container.append(winnerText);
  container.append(document.createElement("br")); // Разрыв строки
  container.append(pointsText);
  container.append(document.createElement("br")); // Разрыв строки
  container.append(finalTimer);
  // container.append(timerComponent());
  container.append(document.createElement("br")); // Разрыв строки
  container.append(playAgainButtonElement);

  // Добавляем контейнер в DOM
  element.append(container);
};
