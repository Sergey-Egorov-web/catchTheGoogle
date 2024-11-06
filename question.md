const localState = { status: null } gameComponent.js почему пишем именно так, а не просто localStateStatus

case GAME_STATUSES.SETTINGS:
const settingsModeInstance = SettingsMode()
element.append(settingsModeInstance.element) почему мы используем settingsModeInstance.element, а не просто settingsModeInstance
