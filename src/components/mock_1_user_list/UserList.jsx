import {useState, useEffect, useMemo} from 'react'
import UserItemList from './UserItemList'
import useDebounce from './useDebounce'

const baseURL = 'https://jsonplaceholder.typicode.com/users'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const debounceSearch = useDebounce(search, 500)
  const normalizedSeach = debounceSearch.toLowerCase()
  
  const usersFiltered = useMemo(() => {
    return users.filter(item => item.name?.toLowerCase().includes(normalizedSeach))
  }, [users, debounceSearch])
  
  useEffect(() => {
    let isMounted = true;
      async function fetchUsers() {
        try {
            const resp = await fetch(baseURL);
            if(!resp.ok) {
                throw new Error('Something went wrong')
            }
            const data = await resp.json()
            if(isMounted) {
                setUsers(data)
            }
        } catch (error) {
            if(isMounted) {
                setError('Something went wrong')
            }
        } finally {
            if(isMounted) {
             setLoading(false)
            }
        }
      }
    fetchUsers()

    return () => {
        isMounted = false;
    }
  }, [])

  if(error) return <div>Error: {error}</div>
  if(loading) return <div>Loading...</div>

  return (
    <section>
        <input
        type='text'
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder='Search'
        />
        {usersFiltered.map(user => (
            <UserItemList name={user?.name} email={user?.email} key={user?.id} />
        ))}
    </section>
  )
}

export default UserList