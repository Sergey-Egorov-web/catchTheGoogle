export function pointsToWinComponent() {
  const element = document.createElement("div");

  pointsToWinComponent.render(element);

  return { element };
}

pointsToWinComponent.render = (element) => {
  element.append("points to win");
  element.append("10");
};
