import React from 'react'

const Row = ({row}) => {
  return (
    <tr>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>{row.age}</td>
    </tr>
  )
}

export default React.memo(Row)