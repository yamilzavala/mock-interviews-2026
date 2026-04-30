import React from 'react'

const Row = ({user}) => {

  return (
    <tr>
        <td>{user?.name}</td>
        <td>{user?.id}</td>
        <td>{user?.role}</td>
    </tr>
  )
}

export default React.memo(Row)