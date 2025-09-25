import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron'
import path from 'path'
import fs from 'fs/promises'

let mainWindow: BrowserWindow | null = null
const isDev = process.env.NODE_ENV !== 'production'

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 15, y: 15 }
  })

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

const userDataPath = app.getPath('userData')

ipcMain.handle('settings:load', async () => {
  try {
    const settingsPath = path.join(userDataPath, 'settings.json')
    const data = await fs.readFile(settingsPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return {}
  }
})

ipcMain.handle('settings:save', async (_event, settings) => {
  try {
    const settingsPath = path.join(userDataPath, 'settings.json')
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2))
    return true
  } catch (error) {
    console.error('설정 저장 실패:', error)
    return false
  }
})

ipcMain.handle('data:load', async () => {
  try {
    const dataPath = path.join(userDataPath, 'data.json')
    const data = await fs.readFile(dataPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { events: [], tasks: [], notes: [] }
  }
})

ipcMain.handle('data:save', async (_event, data) => {
  try {
    const dataPath = path.join(userDataPath, 'data.json')
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error('데이터 저장 실패:', error)
    return false
  }
})

ipcMain.handle('stickers:load', async () => {
  try {
    const stickersPath = path.join(userDataPath, 'stickers.json')
    const data = await fs.readFile(stickersPath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return { stickers: [] }
  }
})

ipcMain.handle('stickers:save', async (_event, stickers) => {
  try {
    const stickersPath = path.join(userDataPath, 'stickers.json')
    await fs.writeFile(stickersPath, JSON.stringify(stickers, null, 2))
    return true
  } catch (error) {
    console.error('스티커 저장 실패:', error)
    return false
  }
})

ipcMain.handle('image:select', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: '이미지', extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'] }
    ]
  })

  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0]
  }
  return null
})

ipcMain.handle('image:save', async (_event, imagePath: string, type: 'background' | 'banner') => {
  try {
    const imagesDir = path.join(userDataPath, 'images', type === 'background' ? 'backgrounds' : 'banners')
    await fs.mkdir(imagesDir, { recursive: true })

    const fileName = `${Date.now()}_${path.basename(imagePath)}`
    const destination = path.join(imagesDir, fileName)

    await fs.copyFile(imagePath, destination)
    return destination
  } catch (error) {
    console.error('이미지 저장 실패:', error)
    return null
  }
})