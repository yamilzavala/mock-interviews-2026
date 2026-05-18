import React from 'react'
import useTable from './useTable'
import Row from './Row'

const DataTable = () => {
  const {
    data,
    fetchData,
    hasMore,
    search,
    handleSearch,
    sort,
    handleSort
  } = useTable()

  const getSortIcon = (key) => {
    if (sort.key !== key) return ''
    return sort.direction === 'asc' ? '↑' : '↓'
  }

  return (
    <div>
      {/* 🔎 search */}
      <input
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by name"
      />

      {/* 📊 table */}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id')}>
              ID {getSortIcon('id')}
            </th>
            <th onClick={() => handleSort('name')}>
              NAME {getSortIcon('name')}
            </th>
            <th onClick={() => handleSort('age')}>
              AGE {getSortIcon('age')}
            </th>
          </tr>
        </thead>

        <tbody>
          {data.map(row => (
            <Row key={row.id} row={row} />
          ))}
        </tbody>
      </table>

      {/* 🔁 cursor pagination */}
      <div>
        <button
          disabled={!hasMore}
          onClick={fetchData}
        >
          Load more
        </button>
      </div>
    </div>
  )
}

export default DataTable