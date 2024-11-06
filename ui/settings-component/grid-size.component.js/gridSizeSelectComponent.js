import { setColumnsCounter, setRowsCounter } from "../../../state/data.js";

export function gridSizeSelectComponent() {
  const gridSizeSelectElement = document.createElement("select");
  gridSizeSelectElement.name = "gridSize";
  gridSizeSelectElement.size = 1;

  const options = [
    { value: "3", text: "3x3" },
    { value: "4", text: "4x4", selected: true },
    { value: "5", text: "5x5" },
    { value: "6", text: "6x6" },
    { value: "7", text: "7x7" },
    { value: "8", text: "8x8" },
  ];

  options.forEach((option) => {
    const gridSizeOptionElement = document.createElement("option");
    gridSizeOptionElement.value = option.value;
    gridSizeOptionElement.text = option.text;
    if (option.selected) {
      gridSizeOptionElement.selected = true;
    }
    gridSizeSelectElement.append(gridSizeOptionElement);
  });

  gridSizeSelectElement.addEventListener("change", function () {
    for (let i = 0; i < gridSizeSelectElement.options.length; i++) {
      if (gridSizeSelectElement.options[i].selected) {
        setRowsCounter(gridSizeSelectElement.options[i].value);
        setColumnsCounter(gridSizeSelectElement.options[i].value);

        break;
      }
    }
  });

  return gridSizeSelectElement;
}
