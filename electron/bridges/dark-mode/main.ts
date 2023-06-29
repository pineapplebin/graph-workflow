import { ipcMain, nativeTheme } from 'electron'
import { E_FOLLOW_SYSTEM, E_GET_CURRENT_MODE, E_TOGGLE } from './constants'

export function registerHandle() {
  ipcMain.handle(E_GET_CURRENT_MODE, () => {
    return nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
  })

  ipcMain.handle(E_TOGGLE, () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
  })

  ipcMain.handle(E_FOLLOW_SYSTEM, () => {
    nativeTheme.themeSource = 'system'
  })
}
