import { getTimeToWin, playAgain, subscribe } from "../state/data.js";
import { EVENTS } from "../state/EVENT.js";

export function LoseMode() {
  const element = document.createElement("div");
  console.log("LoseMode creating");
  // const unsubscribe = subscribe((event) => {
  //   if (event.type === EVENTS.GAME_END) {
  //     console.log("LoseMode unsubscribe ");
  //     LoseMode.render(element);
  //   }
  //   Game.render(element, localState);
  // });

  LoseMode.render(element);

  return {
    element,
    // cleanup: () => {
    //   unsubscribe();
    // },
  };
}

LoseMode.render = (element) => {
  element.innerHTML = "";
  console.log("LoseMode.rendering");
  element.append("GOOGLE WIN");
  const finalTimer = document.createElement("div");
  finalTimer.append(`Time: ${getTimeToWin()}`);
  element.append(finalTimer);

  const playAgainButtonElement = document.createElement("button");
  playAgainButtonElement.append("PLAY AGAIN 🚀");

  playAgainButtonElement.addEventListener("click", () => {
    playAgain();
  });

  element.append(playAgainButtonElement);
};
