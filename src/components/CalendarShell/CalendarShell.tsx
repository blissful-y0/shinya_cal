import React, { ReactNode } from 'react'
import './CalendarShell.scss'

interface CalendarShellProps {
  children: ReactNode
  bannerImage?: string
}

const CalendarShell: React.FC<CalendarShellProps> = ({ children, bannerImage }) => {
  return (
    <div className="calendar-shell">
      {bannerImage && (
        <div className="calendar-shell__banner">
          <img src={bannerImage} alt="배너" />
        </div>
      )}
      <div className="calendar-shell__main">
        {children}
      </div>
    </div>
  )
}

export default CalendarShell