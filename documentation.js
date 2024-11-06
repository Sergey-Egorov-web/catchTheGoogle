/**
 * Создается объект `event`, который содержит два свойства:
 * `type`: Тип события, переданный в функцию `_notify`.
 * `payload`: Данные, связанные с событием, переданные в функцию `_notify`.
 * Если данные не переданы, используется пустой объект `{}`.
 */

function _notify(type, payload = {}) {
  const event = {
    type,
    payload,
  };
  _observers.forEach((cc) => cc(event));
}

/**
 *   функция подписки, функция callback подписывается на событие и
 * добавляется в массив наблюдателей
 */

export function subscribe(callback) {
  _observers.push(callback);

  window._observers = _observers;

  return () => {
    unsubscribe(callback); // возвращает функцию отписки
  };
}

/**
 * функция отписки, удаляет callback из массива наблюдателей
 *
 * @export
 * @param {*} callback
 */
export function unsubscribe(callback) {
  _observers = _observers.filter((o) => o !== callback);

  window._observers = _observers;
}
