import React, { ReactNode } from 'react'
import './GlassLayout.scss'

interface GlassLayoutProps {
  children: ReactNode
  backgroundImage?: string
}

const GlassLayout: React.FC<GlassLayoutProps> = ({ children, backgroundImage }) => {
  return (
    <div className="glass-layout">
      {backgroundImage && (
        <div
          className="glass-layout__background"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="glass-layout__content">
        {children}
      </div>
    </div>
  )
}

export default GlassLayout