import { ipcRenderer } from 'electron'
import { E_GET_APP_DATA_PATH } from './constants'

export function registerBridge(bridge: any) {
  Object.assign(bridge, {
    persistence: {
      getAppDataPath: () => ipcRenderer.invoke(E_GET_APP_DATA_PATH),
    },
  })
}
