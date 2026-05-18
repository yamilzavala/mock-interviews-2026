import React from 'react'

const User = ({user}) => {
  return (
    <article style={{border:'solid 1px #ccc', padding: '10px', marginTop: '5px', width: '300px'}}>
        <div>{user?.id} </div>
        <div>{user?.name}</div>
        <div>{user?.email}</div>
    </article>
  )
}

export default React.memo(User)