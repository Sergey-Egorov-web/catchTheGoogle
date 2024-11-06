import { Game } from "./game.component.js";
import { controls } from "./controls.js";

const rootElement = document.getElementById("root");

function render() {
  const gameInstance = Game();

  rootElement.append(gameInstance.element);
}

// controls();

render();
