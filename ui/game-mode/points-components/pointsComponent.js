import { getPlayerName, getPoints, subscribe } from "../../../state/data.js";
import { EVENTS } from "../../../state/EVENT.js";

export function pointsComponent(player) {
  const element = document.createElement("p");
  console.log("pointsComponent create...");

  let previousPoints = getPoints(player);

  const unsubscribe = subscribe((event) => {
    if (
      event.type === EVENTS.GOOGLE_WAS_CAUGHT ||
      event.type === EVENTS.GOOGLE_ESCAPED
    ) {
      const currentPoints = getPoints(player);
      if (currentPoints !== previousPoints) {
        previousPoints = currentPoints;
        pointsComponent.render(element, player);
      }
    }
  });

  pointsComponent.render(element, player);

  return {
    element,
    cleanup: () => {
      unsubscribe();
    },
  };
}

pointsComponent.render = (element, player) => {
  console.log(
    `pointsComponent player ${player} rendering ${getPoints(player)}...`
  );
  element.innerHTML = "";

  const pointsInstance = getPoints(player);
  element.append(pointsInstance);
};
