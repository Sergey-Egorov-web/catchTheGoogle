import { getPlayerName, subscribe } from "../../../state/data.js";
import { EVENTS } from "../../../state/EVENT.js";
import { playerComponent } from "../../game-mode/player-component.js";
import { dialogActionsComponent } from "./dialogActionsComponent.js";
import { dialogFormComponent } from "./dialogFormComponent.js";

export function playerNameComponent() {
  const element = document.createElement("div");
  console.log("playerNameComponent created");
  const unsubscribe = subscribe((event) => {
    if (event.type === EVENTS.PLAYER_NAME_WAS_CHANGED) {
      playerNameComponent.render(element);
    }
  });

  playerNameComponent.render(element);

  return {
    element,
    cleanup: () => {
      unsubscribe();
    },
  };
}

playerNameComponent.render = (element) => {
  console.log("playerNameComponent rendering");
  element.innerHTML = "";

  const dialog = document.createElement("dialog");

  element.append(`Player1 name: ${getPlayerName(1)}`);

  const changeNamePlayer1Button = document.createElement("button");

  changeNamePlayer1Button.append("✏️");

  changeNamePlayer1Button.addEventListener("click", () => {
    dialog.innerHTML = "";
    let dialogAction = dialogActionsComponent("1");

    dialog.append(dialogFormComponent(), dialogAction.element);
    // dialog.showModal();
    dialog.open = true;
  });

  element.append(changeNamePlayer1Button);

  element.append(document.createElement("br")); // Разрыв строки

  element.append(`Player2 name: ${getPlayerName(2)}`);

  const changeNamePlayer2Button = document.createElement("button");

  changeNamePlayer2Button.append("✏️");

  changeNamePlayer2Button.addEventListener("click", () => {
    dialog.innerHTML = "";
    let dialogAction = dialogActionsComponent(2);
    dialog.append(dialogFormComponent(), dialogAction.element);
    // dialog.showModal();
    dialog.open = true;
  });

  element.append(changeNamePlayer2Button);

  element.append(dialog);
};
