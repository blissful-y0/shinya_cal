import React from 'react'
import { Task } from '@/types'
import './TaskPanel.scss'

const TaskPanel: React.FC = () => {
  const tasks: Task[] = []

  return (
    <div className="task-panel">
      <div className="task-panel__header">
        <h3>오늘의 할 일</h3>
        <button className="task-panel__add-btn">+</button>
      </div>

      <div className="task-panel__list">
        {tasks.length === 0 ? (
          <p className="task-panel__empty">할 일이 없습니다</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-panel__item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
              />
              <span className={task.completed ? 'task-panel__item--completed' : ''}>
                {task.title}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskPanel