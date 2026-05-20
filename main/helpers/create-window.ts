import {
  screen,
  BrowserWindow,
  BrowserWindowConstructorOptions,
  Rectangle,
} from 'electron'
import Store from 'electron-store'

type CreateWindowOptions = BrowserWindowConstructorOptions & {
  partition?: string // 👈 NEW
  instanceId?: string // 👈 optional (for window state separation)
}

export const createWindow = (
  windowName: string,
  options: CreateWindowOptions
): BrowserWindow => {
  const { partition, instanceId, ...browserOptions } = options

  // 👇 make store unique per instance if needed
  const name = `window-state-${windowName}${instanceId ? `-${instanceId}` : ''}`
  const key = 'window-state'
  const store = new Store<Rectangle>({ name })

  const defaultSize = {
    width: browserOptions.width,
    height: browserOptions.height,
  }

  let state: any = {}

  const restore = () => store.get(key, defaultSize)

  const getCurrentPosition = () => {
    const position = win.getPosition()
    const size = win.getSize()
    return {
      x: position[0],
      y: position[1],
      width: size[0],
      height: size[1],
    }
  }

  const windowWithinBounds = (windowState, bounds) => {
    return (
      windowState.x >= bounds.x &&
      windowState.y >= bounds.y &&
      windowState.x + windowState.width <= bounds.x + bounds.width &&
      windowState.y + windowState.height <= bounds.y + bounds.height
    )
  }

  const resetToDefaults = () => {
    const bounds = screen.getPrimaryDisplay().bounds
    return {
      ...defaultSize,
      x: (bounds.width - defaultSize.width) / 2,
      y: (bounds.height - defaultSize.height) / 2,
    }
  }

  const ensureVisibleOnSomeDisplay = (windowState) => {
    const visible = screen.getAllDisplays().some((display) =>
      windowWithinBounds(windowState, display.bounds)
    )
    return visible ? windowState : resetToDefaults()
  }

  const saveState = () => {
    if (!win.isMinimized() && !win.isMaximized()) {
      Object.assign(state, getCurrentPosition())
    }
    store.set(key, state)
  }

  state = ensureVisibleOnSomeDisplay(restore())

  const win = new BrowserWindow({
    ...state,
    ...browserOptions,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,

      // 👇 THIS enables full session isolation
      partition: partition,

      ...browserOptions.webPreferences,
    },
  })

  win.on('close', saveState)

  return win
}