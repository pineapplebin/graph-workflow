import { app, ipcMain } from 'electron'
import { E_GET_APP_DATA_PATH } from './constants'

export function registerHandle() {
  ipcMain.handle(E_GET_APP_DATA_PATH, () => {
    return app.getPath('appData')
  })
}
