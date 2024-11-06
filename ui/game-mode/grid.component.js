import { getGridSize } from "../../state/data.js";
import { cellComponent } from "./cellComponent.js";

export const Grid = () => {
  console.log("Grid created...");
  const element = document.createElement("table");

  const localState = {
    childrenCleanups: [],
  };

  Grid.render(element, localState);

  return {
    element,
    cleanup: () => {
      localState.childrenCleanups.forEach((cc) => cc());
    },
  };
};

Grid.render = (element, localState) => {
  console.log("Grid rendering...");
  element.innerHTML = "";
  localState.childrenCleanups.forEach((cc) => cc());
  localState.childrenCleanups = [];
  const gridSize = getGridSize();

  for (let y = 0; y < gridSize.rowsCount; y++) {
    const row = document.createElement("tr");

    for (let x = 0; x < gridSize.columnsCount; x++) {
      const sellComponentInstance = cellComponent(x, y);
      localState.childrenCleanups.push(sellComponentInstance.cleanup);
      row.append(sellComponentInstance.element);
    }

    element.append(row);
  }

  window.grid = element;
};
