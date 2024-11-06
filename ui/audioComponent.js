import { getSounds } from "../state/data.js";

export function audioComponent(element) {
  // Создаем новый экземпляр класса Audio
  //   const audio = new Audio("/sources/googleWin.wav");

  const audio = new Audio(getSounds(element));

  // Начинаем воспроизведение аудио
  audio.play();

  // Устанавливаем громкость на 50%
  audio.volume = 0.8;

  //   // Приостанавливаем воспроизведение через 5 секунд
  //   setTimeout(() => {
  //     audio.pause();
  //   }, 5000);

  // Проверяем, поддерживается ли формат MP3
  // const canPlayMP3 = audio.canPlayType("audio/mpeg");
  // console.log("Can play MP3:", canPlayMP3);

  //   // Добавляем обработчик события завершения воспроизведения
  //   audio.addEventListener("ended", () => {
  //     console.log("Audio playback ended");
  //   });
}
