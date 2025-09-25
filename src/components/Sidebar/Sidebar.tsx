import React, { useState } from 'react'
import TaskPanel from './TaskPanel/TaskPanel'
import NotePanel from './NotePanel/NotePanel'
import LayoutPanel from './LayoutPanel/LayoutPanel'
import './Sidebar.scss'

type TabType = 'tasks' | 'notes' | 'layout'

interface SidebarProps {
  width?: number
  onWidthChange?: (width: number) => void
}

const Sidebar: React.FC<SidebarProps> = ({ width = 300, onWidthChange }) => {
  const [activeTab, setActiveTab] = useState<TabType>('tasks')
  const [isResizing, setIsResizing] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  React.useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = window.innerWidth - e.clientX
      const clampedWidth = Math.min(Math.max(250, newWidth), 500)
      onWidthChange?.(clampedWidth)
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, onWidthChange])

  return (
    <div className="sidebar" style={{ width }}>
      <div className="sidebar__resize-handle" onMouseDown={handleMouseDown} />

      <div className="sidebar__tabs">
        <button
          className={`sidebar__tab ${activeTab === 'tasks' ? 'sidebar__tab--active' : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          할 일
        </button>
        <button
          className={`sidebar__tab ${activeTab === 'notes' ? 'sidebar__tab--active' : ''}`}
          onClick={() => setActiveTab('notes')}
        >
          노트
        </button>
        <button
          className={`sidebar__tab ${activeTab === 'layout' ? 'sidebar__tab--active' : ''}`}
          onClick={() => setActiveTab('layout')}
        >
          레이아웃
        </button>
      </div>

      <div className="sidebar__content">
        {activeTab === 'tasks' && <TaskPanel />}
        {activeTab === 'notes' && <NotePanel />}
        {activeTab === 'layout' && <LayoutPanel />}
      </div>
    </div>
  )
}

export default Sidebar