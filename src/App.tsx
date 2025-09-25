import React, { useState } from 'react'
import GlassLayout from '@components/GlassLayout'
import CalendarShell from '@components/CalendarShell'
import Sidebar from '@components/Sidebar'

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(300)

  return (
    <div className="app">
      <GlassLayout>
        <CalendarShell>
          <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>신야네 캘린더</h1>
            <p>캘린더 뷰가 여기에 표시됩니다</p>
          </div>
        </CalendarShell>
        <Sidebar width={sidebarWidth} onWidthChange={setSidebarWidth} />
      </GlassLayout>
    </div>
  )
}

export default App