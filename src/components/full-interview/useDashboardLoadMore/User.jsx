import React from 'react'

const User = ({user}) => {
  return (
    <article style={{border:'solid 1px #ccc', padding: '10px', marginTop: '5px'}}>
        {user?.id} 
        {user?.name}
        {user?.email}
    </article>
  )
}

export default React.memo(User)