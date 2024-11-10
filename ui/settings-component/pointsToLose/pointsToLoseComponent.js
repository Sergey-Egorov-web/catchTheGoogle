import { pointsToLoseSelectComponent } from "./pointsToLoseSelectComponent.js";

export function pointsToLoseComponent() {
  const element = document.createElement("span");

  pointsToLoseComponent.render(element);

  return { element };
}

pointsToLoseComponent.render = (element) => {
  element.append("points to lose");

  element.append(pointsToLoseSelectComponent());
};
