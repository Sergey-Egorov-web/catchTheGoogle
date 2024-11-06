import { gridSizeSelectComponent } from "./gridSizeSelectComponent.js";

export function gridSizeComponent() {
  const element = document.createElement("span");

  gridSizeComponent.render(element);

  return { element };
}

gridSizeComponent.render = (element) => {
  element.append("grid size");

  element.append(gridSizeSelectComponent());
};
