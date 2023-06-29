import { ipcRenderer } from 'electron'

export function registerBridge(bridge: any) {
  Object.assign(bridge, {
    darkMode: {
      getCurrentMode: () => ipcRenderer.invoke('dark-mode:getCurrentMode'),
      toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
      system: () => ipcRenderer.invoke('dark-mode:system'),
    },
  })
}
