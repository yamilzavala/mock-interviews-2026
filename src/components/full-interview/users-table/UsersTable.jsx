import React from 'react'
import Row from './Row'

const cols = ['ID', 'NAME', 'ROLE']

const UsersTable = ({data}) => {
  return (
    <table>
        <thead>
            <tr>
                {cols.map((col) => (
                    <th key={col}>
                        {col}
                    </th>
                ))}
            </tr>
        </thead>

        <tbody>
            {data.map((user) => (
                <Row 
                key={user.id}
                user={user}
                />
            ))}
        </tbody>
    </table>
  )
}

export default React.memo(UsersTable)