import { movePlayer, subscribe } from "../state/data.js";
import { EVENTS } from "../state/EVENT.js";
import { MOVE_DIRECTIONS } from "../state/MOVE_DIRECTIONS.js";

export function controls() {
  const keyCodeMappings = {
    KeyW: "W", // Английская раскладка
    KeyS: "S", // Английская раскладка
    KeyA: "A", // Английская раскладка
    KeyD: "D", // Английская раскладка
    KeyЦ: "W", // Русская раскладка
    KeyЫ: "S", // Русская раскладка
    KeyФ: "A", // Русская раскладка
    KeyВ: "D", // Русская раскладка
  };

  const keyupHandler = (event) => {
    const mappedCode = keyCodeMappings[event.code] || event.code;
    // switch (event.key) {
    switch (mappedCode) {
      case "ArrowUp":
        movePlayer(1, MOVE_DIRECTIONS.UP);
        break;
      case "ArrowDown":
        movePlayer(1, MOVE_DIRECTIONS.DOWN);
        break;
      case "ArrowLeft":
        movePlayer(1, MOVE_DIRECTIONS.LEFT);
        break;
      case "ArrowRight":
        movePlayer(1, MOVE_DIRECTIONS.RIGHT);
        break;

      case "W":
        movePlayer(2, MOVE_DIRECTIONS.UP);
        break;
      case "S":
        movePlayer(2, MOVE_DIRECTIONS.DOWN);
        break;
      case "A":
        movePlayer(2, MOVE_DIRECTIONS.LEFT);
        break;
      case "D":
        movePlayer(2, MOVE_DIRECTIONS.RIGHT);
        break;
    }
  };
  window.addEventListener("keyup", keyupHandler);

  const unsubscribe = subscribe((event) => {
    if (event.type === EVENTS.GAME_END) {
      console.log("Controls disconnected");
      window.removeEventListener("keyup", keyupHandler);
    }
  });

  return {
    cleanup: () => {
      unsubscribe();
    },
  };
}
