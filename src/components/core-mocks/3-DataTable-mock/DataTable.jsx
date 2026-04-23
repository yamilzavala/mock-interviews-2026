import React from 'react'
import useTable from './useTable'
import Row from './Row'

const DataTable = ({ data }) => {
  // get values and handlers form custom hook
  const {
    page,
    setPage,
    paginatedData,
    sort,
    handleSort,
    totalPages,
    search,
    setSearch
  } = useTable(data)

  const setSorting = (key) => {
    if(key === sort.key) {
        return sort.direction === 'asc' ? '↓' : '↑'
    } 
    return ''
  }

  return (
    <div>
        {/* search */}
       <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search by name'
       />

       {/* table */}
       <table>
            {/* header */}
            <thead>
                <tr>
                    <th onClick={() => { handleSort('id'); setPage(1) }}>
                        ID {setSorting('id')}
                    </th>
                    <th onClick={() => { handleSort('name'); setPage(1) }}>
                        NAME {setSorting('name')}
                    </th>
                    <th onClick={() => { handleSort('age'); setPage(1) }}>
                        AGE {setSorting('age')}
                    </th>
                </tr>
            </thead>

            {/* body */}
            <tbody>
                {paginatedData?.map(row => (
                    <Row key={row.id} row={row}/>
                ))}
            </tbody>
       </table>

       {/* navigation */}
       <div>
        <button disabled={page <= 1} type='button' onClick={() => setPage(prev => prev - 1)}>prev</button>
            Page {page} of {totalPages}
        <button disabled={page >= totalPages } type='button' onClick={() => setPage(prev => prev + 1)}>next</button>
       </div>
    </div>
  )
}

export default DataTable