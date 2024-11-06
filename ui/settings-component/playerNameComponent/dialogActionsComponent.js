import {
  getPlayerName,
  setPlayerName,
  subscribe,
} from "../../../state/data.js";

export function dialogActionsComponent(number) {
  const element = document.createElement("div");

  dialogActionsComponent.render(element, number);

  return { element };
}

dialogActionsComponent.render = (element, number) => {
  const cancelButtonElement = document.createElement("button");
  cancelButtonElement.append("Cancel");

  cancelButtonElement.addEventListener("click", () => {
    // Закрываем диалог при нажатии на кнопку "Cancel"
    const dialog = element.closest("dialog");
    if (dialog) {
      dialog.close();
    }
  });

  const okButtonElement = document.createElement("button");
  okButtonElement.append("Ok");

  okButtonElement.addEventListener("click", () => {
    const dialog = element.closest("dialog");
    if (dialog) {
      const playerNameInputElement = dialog.querySelector("input");
      if (playerNameInputElement) {
        // console.log("Input value:", playerNameInputElement.value);
        setPlayerName(number, playerNameInputElement.value);

        dialog.close(); // Закрываем диалог после сохранения
      } else {
        console.error("Input element not found");
      }
    } else {
      console.error("Dialog element not found");
    }
  });

  element.append(cancelButtonElement, okButtonElement);

  // return element;
};
