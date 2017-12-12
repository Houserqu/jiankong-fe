import React from 'react';

const MonitorsGridItem = ({ data }) => {
  return (
    <div>
      <div style={{ padding: '12.5px' }}>
        <i className="iconfont icon-shexiangtou" style={{ fontSize: '25px' }}  />
        <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
          <span>{data.name}</span>
        </div>
      </div>
    </div>
  )
}

export default MonitorsGridItem;