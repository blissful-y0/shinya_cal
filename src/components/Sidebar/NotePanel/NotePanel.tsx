import React from 'react'
import { Note } from '@/types'
import './NotePanel.scss'

const NotePanel: React.FC = () => {
  const notes: Note[] = []

  return (
    <div className="note-panel">
      <div className="note-panel__header">
        <h3>노트</h3>
        <button className="note-panel__add-btn">+</button>
      </div>

      <div className="note-panel__list">
        {notes.length === 0 ? (
          <p className="note-panel__empty">노트가 없습니다</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note-panel__item">
              <h4>{note.title}</h4>
              <p>{note.content.substring(0, 50)}...</p>
              <div className="note-panel__tags">
                {note.tags.map(tag => (
                  <span key={tag} className="note-panel__tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotePanel