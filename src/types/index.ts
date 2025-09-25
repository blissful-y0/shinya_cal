export interface Event {
  id: string
  title: string
  date: string
  startTime?: string
  endTime?: string
  isAllDay: boolean
  color: string
  description?: string
}

export interface Task {
  id: string
  title: string
  completed: boolean
  date?: string
  priority?: 'low' | 'medium' | 'high'
  description?: string
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface Sticker {
  id: string
  imagePath: string
  position: { x: number; y: number }
  size: number
  rotation: number
  zIndex: number
  locked?: boolean
}

export interface Settings {
  backgroundImage?: string
  bannerImage?: string
  customColors?: {
    primary: string
    secondary: string
    accent: string
    background: string
    text: string
    border: string
  }
  sidebarWidth?: number
  sidebarPosition?: 'left' | 'right'
}

export type ViewMode = 'month' | 'week'