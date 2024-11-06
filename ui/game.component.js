import { getStatus, subscribe } from "../state/data.js";
import { EVENTS } from "../state/EVENT.js";
import { GAME_STATUSES } from "../state/GAME_STATUSES.js";
import { audioComponent } from "./audioComponent.js";
import { controls } from "./controls.js";
import { GameMode } from "./game-mode/game-mode.component.js";
import { LoseMode } from "./lose-mode.component.js";
import { SettingsMode } from "./settings-component/settings-mode.component.js";
import { winMode } from "./win-mode.component.js";

export const Game = () => {
  console.log("Game creating");
  const element = document.createElement("div");
  const localState = { childrenCleanups: [] };

  const unsubscribe = subscribe((event) => {
    if (event.type === EVENTS.STATUS_CHANGED) {
      console.log("I am Game and I will procces " + event.type);
      Game.render(element, localState);
    } else {
      console.log("I am Game and I ignored event " + event.type);
    }
    Game.render(element, localState);
  });

  Game.render(element, localState);

  return {
    element,
    cleanup: () => {
      unsubscribe();
      localState.childrenCleanups.forEach((cc) => cc());
    },
  };
};

Game.render = (element, localState) => {
  const status = getStatus();
  if (localState.status === status) return;

  console.log("Game rendering");
  localState.status = status;
  element.innerHTML = "";

  //____________________________________________________________
  localState.childrenCleanups.forEach((cc) => cc());
  localState.childrenCleanups = [];
  //____________________________________________________________

  switch (status) {
    case GAME_STATUSES.SETTINGS:
      const settingsModeInstance = SettingsMode();
      localState.childrenCleanups.push(settingsModeInstance.cleanup);
      element.append(settingsModeInstance.element);
      break;
    case GAME_STATUSES.IN_PROGRESS:
      const controlInstance = controls();
      localState.childrenCleanups.push(controlInstance.cleanup);
      const gameModeInstance = GameMode();
      localState.childrenCleanups.push(gameModeInstance.cleanup);
      element.append(gameModeInstance.element);
      break;
    case GAME_STATUSES.LOSE:
      audioComponent("google");
      const loseModeInstance = LoseMode();
      element.append(loseModeInstance.element);
      // localState.childrenCleanups.push(loseModeInstance.cleanup);
      break;
    case GAME_STATUSES.WIN:
      audioComponent("player");

      const winModeInstance = winMode();
      //  localState.childrenCleanups.push(winModeInstance.cleanup);
      element.append(winModeInstance.element);
      break;
    default:
      element.append("STATE IS INVALID");
  }
};
