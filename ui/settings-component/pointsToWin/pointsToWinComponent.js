import { pointsToWInSelectComponent } from "./pointsToWinSelectComponent.js";

export function pointsToWinComponent() {
  const element = document.createElement("span");

  pointsToWinComponent.render(element);

  return { element };
}

pointsToWinComponent.render = (element) => {
  element.append("points to win");
  // element.append("10");
  element.append(pointsToWInSelectComponent());
};
