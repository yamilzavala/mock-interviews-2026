import React from "react"

const UserItem = ({name, email}) => {
  return (
    <article>
        <h3>{name}</h3>
        <p>{email}</p>
    </article>
  )
}

export default React.memo(UserItem)