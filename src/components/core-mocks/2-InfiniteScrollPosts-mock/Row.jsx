import React from 'react'

const Row = ({index, style, data}) => {
  const item = data[index]
  return (
    <div style={style}>
        <h4>{item?.id}</h4>
        <p>{item?.title}</p>
    </div>
  )
}

export default React.memo(Row)