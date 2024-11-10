import { changePointsToLose } from "../../../state/data.js";

export function pointsToLoseSelectComponent() {
  const pointsToLoseSelectComponent = document.createElement("select");
  pointsToLoseSelectComponent.name = "pointsToLose";
  pointsToLoseSelectComponent.size = 1;

  const options = [
    { value: "5", text: "5 pts" },
    { value: "10", text: "10 pts", selected: true },
    { value: "15", text: "15 pts" },
    { value: "20", text: "20 pts" },
    { value: "25", text: "25 pts" },
  ];

  options.forEach((option) => {
    const pointsToLOseOptionElement = document.createElement("option");
    pointsToLOseOptionElement.value = option.value;
    pointsToLOseOptionElement.text = option.text;
    if (option.selected) {
      pointsToLOseOptionElement.selected = true;
    }

    pointsToLoseSelectComponent.append(pointsToLOseOptionElement);
  });

  pointsToLoseSelectComponent.addEventListener("change", function () {
    for (let i = 0; i < pointsToLoseSelectComponent.options.length; i++) {
      if (pointsToLoseSelectComponent.options[i].selected) {
        changePointsToLose(pointsToLoseSelectComponent.options[i].value);

        break;
      }
    }
  });

  return pointsToLoseSelectComponent;
}
