import {
  getGooglePosition,
  getPlayerImage,
  getPlayerPosition,
  subscribe,
} from "../../state/data.js";
import { EVENTS } from "../../state/EVENT.js";
import { playerComponent } from "./player-component.js";

export function cellComponent(x, y) {
  // console.log("Cell creating...");
  const element = document.createElement("td");

  const unsubscribe = subscribe((event) => {
    if (
      event.type === EVENTS.GOOGLE_JUMPED ||
      event.type === EVENTS.PLAYER_MOVED
    ) {
      if (
        (event.payload.newPosition.x === x &&
          event.payload.newPosition.y === y) ||
        (event.payload.prevPosition.x === x &&
          event.payload.prevPosition.y === y)
      ) {
        cellComponent.render(element, x, y);
      } else {
        // console.log("I am a cell and i am not rendering");
      }
    }
  });

  cellComponent.render(element, x, y);

  return {
    element,
    cleanup: () => {
      unsubscribe();
    },
  };
}

cellComponent.render = (element, x, y) => {
  const googlePosition = getGooglePosition();
  const player1Position = getPlayerPosition(1);
  const player2Position = getPlayerPosition(2);

  // console.log("Cell rendering...");

  element.innerHTML = "";

  if (x === googlePosition.x && y === googlePosition.y) {
    let image = playerComponent(getPlayerImage("google"));
    element.append(image);
  }

  if (x === player1Position.x && y === player1Position.y) {
    let image = playerComponent(getPlayerImage("1"));
    element.append(image);
  }
  if (x === player2Position.x && y === player2Position.y) {
    let image = playerComponent(getPlayerImage("2"));
    element.append(image);
  }
};
