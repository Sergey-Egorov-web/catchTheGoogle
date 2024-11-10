import { changePointsToWin } from "../../../state/data.js";

export function pointsToWInSelectComponent() {
  const pointsToWinSelectComponent = document.createElement("select");
  pointsToWinSelectComponent.name = "pointsToWin";
  pointsToWinSelectComponent.size = 1;

  const options = [
    { value: "5", text: "5 pts" },
    { value: "10", text: "10 pts", selected: true },
    { value: "15", text: "15 pts" },
    { value: "20", text: "20 pts" },
    { value: "25", text: "25 pts" },
  ];

  options.forEach((option) => {
    const pointsToWinOptionElement = document.createElement("option");
    pointsToWinOptionElement.value = option.value;
    pointsToWinOptionElement.text = option.text;
    if (option.selected) {
      pointsToWinOptionElement.selected = true;
    }

    pointsToWinSelectComponent.append(pointsToWinOptionElement);
  });

  pointsToWinSelectComponent.addEventListener("change", function () {
    for (let i = 0; i < pointsToWinSelectComponent.options.length; i++) {
      if (pointsToWinSelectComponent.options[i].selected) {
        changePointsToWin(pointsToWinSelectComponent.options[i].value);
        break;
      }
    }
  });

  return pointsToWinSelectComponent;
}
