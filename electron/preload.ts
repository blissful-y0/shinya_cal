import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  settings: {
    load: () => ipcRenderer.invoke('settings:load'),
    save: (settings: any) => ipcRenderer.invoke('settings:save', settings)
  },
  data: {
    load: () => ipcRenderer.invoke('data:load'),
    save: (data: any) => ipcRenderer.invoke('data:save', data)
  },
  stickers: {
    load: () => ipcRenderer.invoke('stickers:load'),
    save: (stickers: any) => ipcRenderer.invoke('stickers:save', stickers)
  },
  image: {
    select: () => ipcRenderer.invoke('image:select'),
    save: (imagePath: string, type: 'background' | 'banner') =>
      ipcRenderer.invoke('image:save', imagePath, type)
  }
})

export interface IElectronAPI {
  settings: {
    load: () => Promise<any>
    save: (settings: any) => Promise<boolean>
  }
  data: {
    load: () => Promise<any>
    save: (data: any) => Promise<boolean>
  }
  stickers: {
    load: () => Promise<any>
    save: (stickers: any) => Promise<boolean>
  }
  image: {
    select: () => Promise<string | null>
    save: (imagePath: string, type: 'background' | 'banner') => Promise<string | null>
  }
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}