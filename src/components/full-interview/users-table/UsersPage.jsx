import React, {useState} from 'react'
import useFetchData from './useFetchData'
import Pagination from './Pagination'
import UsersTable from './UsersTable'

const BASE_URL = 'http://localhost:3000/api/users-table'

const UsersPage = () => {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [page, setPage] = useState(1)

  const {loading, error, data, pagination} = useFetchData(BASE_URL, {page, search, role})

  const handleSearch = (value) => {
    setSearch(value)
    setPage(1)
  }

  const handleRole = (value) => {
    setRole(value)
    setPage(1)
  }

  return (
    <main>
        <h2>Users Dashboard</h2>

        {/* filters */}
        <input 
        type="text" 
        placeholder='Search by name...'
        value={loading ? 'loading...' : search}
        onChange={(e) => handleSearch(e.target.value)}
        disabled={loading}
        />

        <select id="role" value={role} onChange={(e) => handleRole(e.target.value)}>
            <option value=''>All</option>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
        </select>

        {loading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>Error: {error}</p>}

        {/* data */}
        {!loading && !error && data && (
            <UsersTable 
            data={data}
            />
        )}

        {/* pagination */}
        {pagination && (
            <Pagination 
            page={pagination.page}
            totalPages={pagination.totalPages}
            onChange={setPage}
            />
        )}
    </main>
  )
}

export default UsersPage