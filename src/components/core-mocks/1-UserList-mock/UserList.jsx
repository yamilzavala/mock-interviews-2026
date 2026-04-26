import React, {useState} from 'react'
import UserItem from './UserItem'
import useFetchData from './useFetchData'

const BASE_URL = 'https://jsonplaceholder.typicode.com/users'

const UserList = () => {
  const [query, setQuery] = useState('')

  const {data, loading, error} = useFetchData(query, BASE_URL)

  return (
    <main style={{display:'flex', flexDirection: 'column', gap: '1rem'}}>
        <input 
        placeholder='Search ny name'
        value={loading ? 'loadin...' : query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={loading}
        />

        {loading && <p>Loading...</p>}
        {error && <p style={{color:'red'}}>Error: {error}</p>}

        {data?.map(user => (
            <UserItem 
            name={user.name}
            email={user.email}
            />
        ))}

    </main>
  )
}

export default UserList