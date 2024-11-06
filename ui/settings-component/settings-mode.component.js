import { getStatus, startGame } from "../../state/data.js";
import { gridSizeComponent } from "./grid-size.component.js/gridSizeComponent.js";
import { playerNameComponent } from "./playerNameComponent/playerNameComponent.js";
import { pointsToWinComponent } from "./pointsToWin/pointsToWinComponent.js";

export function SettingsMode() {
  const element = document.createElement("div");

  const localState = {
    childrenCleanups: [],
  };

  SettingsMode.render(element, localState);

  return {
    element,
    cleanup: () => {
      localState.childrenCleanups.forEach((cc) => cc());
    },
  };
}

SettingsMode.render = (element, localState) => {
  const gridSizeElement = gridSizeComponent();
  element.append(gridSizeElement.element);

  const pointsToWinElement = pointsToWinComponent();
  element.append(pointsToWinElement.element);

  const playerNameInstance = playerNameComponent();
  localState.childrenCleanups.push(playerNameInstance.cleanup);
  element.append(playerNameInstance.element);

  const startButtonElement = document.createElement("button");
  startButtonElement.append("START 🚀");

  startButtonElement.addEventListener("click", () => {
    startGame();
  });

  element.append(startButtonElement);
};
