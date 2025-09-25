import React from 'react'
import './LayoutPanel.scss'

const LayoutPanel: React.FC = () => {
  return (
    <div className="layout-panel">
      <h3>레이아웃 설정</h3>

      <div className="layout-panel__section">
        <h4>사이드바 위치</h4>
        <div className="layout-panel__radio-group">
          <label>
            <input type="radio" name="sidebar-position" value="left" />
            왼쪽
          </label>
          <label>
            <input type="radio" name="sidebar-position" value="right" defaultChecked />
            오른쪽
          </label>
        </div>
      </div>

      <div className="layout-panel__section">
        <h4>테마 색상</h4>
        <div className="layout-panel__colors">
          <div className="layout-panel__color">
            <label>주 색상</label>
            <input type="color" value="#000000" onChange={() => {}} />
          </div>
          <div className="layout-panel__color">
            <label>배경 색상</label>
            <input type="color" value="#ffffff" onChange={() => {}} />
          </div>
          <div className="layout-panel__color">
            <label>텍스트 색상</label>
            <input type="color" value="#000000" onChange={() => {}} />
          </div>
        </div>
      </div>

      <div className="layout-panel__section">
        <h4>뷰 모드</h4>
        <div className="layout-panel__radio-group">
          <label>
            <input type="radio" name="view-mode" value="month" defaultChecked />
            월간 보기
          </label>
          <label>
            <input type="radio" name="view-mode" value="week" />
            주간 보기
          </label>
        </div>
      </div>
    </div>
  )
}

export default LayoutPanel