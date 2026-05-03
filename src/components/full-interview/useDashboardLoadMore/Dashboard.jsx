import Reac, {useState} from 'react'
import User from './User';
import useFetchData from './useFetchData';

const BASE_URL = 'http://localhost:3000/api/search-users'

const Dashboard = () => {
  // states
  const [search, setSearch] = useState('')
  const [cursor, setCursor] = useState(0)

  const {loading, error, data, pagination} = useFetchData(BASE_URL, {search, cursor})

  //handler
  const cursorPageHandler = (value) => {
    setCursor(value);
  }

  const searchHandler = (value) => {
    setSearch(value);
    setCursor(0)
  }

  return (
    <main>
        <h3>Dashboard</h3>

        {/* input */}
        <input 
        placeholder='search by name'
        disabled={loading}
        value={loading ? 'loading...' : search}
        onChange={(e) = searchHandler(e.target.value)}
        />

        {/* loading - error */}
        {loading && <p>Loading...</p>}
        {error && <p style={{color:'red'}}>Error: {error}</p>}

        {/* data */}
        {!loading && !error && data && (
            <div>
                {data?.map(user => (
                    <User 
                    key={user.id}
                    user={user}
                    />
                ))}
            </div>
        )}

        {/* pagination */}
        {pagination?.hasMore && (
            <button onClick={() => cursorPageHandler(pagination.cursor)}>Load more</button>
        )}
    </main>
  )
}

export default Dashboard