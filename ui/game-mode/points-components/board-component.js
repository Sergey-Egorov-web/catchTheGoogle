import { playerPointsComponent } from "./playerPointsComponent.js";
import { timerComponent } from "./timerComponent.js";

export function boardComponent() {
  const element = document.createElement("div");
  element.classList.add("my-class");
  console.log("boardComponent created...");

  const localState = {
    childrenCleanups: [],
  };

  boardComponent.render(element, localState);

  return {
    element,
    cleanup: () => {
      localState.childrenCleanups.forEach((cc) => cc());
    },
  };
}

boardComponent.render = (element, localState) => {
  let board = document.createElement("span");
  console.log("boardComponent rendering...");
  localState.childrenCleanups.forEach((cc) => cc());
  localState.childrenCleanups = [];
  const pointsComponentPlayer1Instance = playerPointsComponent("1");
  localState.childrenCleanups.push(pointsComponentPlayer1Instance.cleanup);
  board.append(pointsComponentPlayer1Instance.element);
  const pointsComponentPlayer2Instance = playerPointsComponent("2");
  localState.childrenCleanups.push(pointsComponentPlayer2Instance.cleanup);
  board.append(pointsComponentPlayer2Instance.element);
  const pointsComponentGoogleInstance = playerPointsComponent("google");
  localState.childrenCleanups.push(pointsComponentGoogleInstance.cleanup);
  board.append(pointsComponentGoogleInstance.element);

  board.append(timerComponent());

  element.append(board);
};
