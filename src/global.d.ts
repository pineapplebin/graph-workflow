export declare global {
  interface Window {
    bridge: ElectronBridge
  }
}

export declare interface ElectronBridge {
  darkMode: {
    getCurrentMode: () => Promise<'light' | 'dark'>
    toggle: () => Promise<unknown>
    system: () => Promise<unknown>
  }
  persistence: {
    getAppDataPath: () => Promise<string>
  }
}
