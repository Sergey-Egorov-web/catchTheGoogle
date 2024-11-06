import { getPlayerName, setPlayerName } from "../../../state/data.js";

export function dialogFormComponent() {
  const element = document.createElement("form");
  // element.innerHTML = "";  возможно не нужно
  const playerNameInputElement = document.createElement("input");

  setTimeout(() => {
    playerNameInputElement.focus();
  }, 0);

  element.append(playerNameInputElement);
  return element;
}
