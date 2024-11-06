import { getPlayerImage, getPlayerName } from "../../../state/data.js";
import { playerComponent } from "../player-component.js";
import { pointsComponent } from "./pointsComponent.js";

export function playerPointsComponent(player) {
  const localState = {
    childrenCleanups: [],
  };
  const element = document.createElement("span");
  playerPointsComponent.render(element, localState, player);

  return {
    element,
    cleanup: () => {
      localState.childrenCleanups.forEach((cc) => cc());
      console.log(`"player"${player}PointsComponent unsubscribe...`);
    },
  };
}

playerPointsComponent.render = (element, localState, player) => {
  console.log(`"player"${player}PointsComponent created...`);

  element.innerHTML = "";
  localState.childrenCleanups.forEach((cc) => cc());
  localState.childrenCleanups = [];

  const playerName = getPlayerName(player);

  element.append(playerName);
  const image = playerComponent(getPlayerImage(player));
  element.append(image);
  const pointsInstance = pointsComponent(player);
  localState.childrenCleanups.push(pointsInstance.cleanup);
  element.append(pointsInstance.element);

  return element;
};
