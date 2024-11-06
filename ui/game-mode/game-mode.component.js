import { Grid } from "./grid.component.js";
import { boardComponent } from "./points-components/board-component.js";

export function GameMode() {
  const element = document.createElement("div");

  const localState = {
    childrenCleanups: [],
  };

  GameMode.render(element, localState);

  return {
    element,
    cleanup: () => {
      localState.childrenCleanups.forEach((cc) => cc());
      element.remove();
    },
  };
}

GameMode.render = (element, localState) => {
  const boardComponentInstance = boardComponent();
  localState.childrenCleanups.push(boardComponentInstance.cleanup);
  element.append(boardComponentInstance.element);
  const gridComponentInstance = Grid();
  localState.childrenCleanups.push(gridComponentInstance.cleanup);
  element.append(gridComponentInstance.element);
};
