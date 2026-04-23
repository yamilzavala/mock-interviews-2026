import { useState, useMemo, useCallback, useEffect } from 'react'

const PAGE_SIZE = 5;

//compare helper
const compare = (aVal, bVal, direction) => {
   if(typeof aVal === 'string' && typeof bVal === 'string') {
    return direction === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal)
   }
   return direction === 'asc'
        ? aVal - bVal
        : bVal - aVal
}

const useTable = (data = []) => {
  //states
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({key: 'id', direction: 'asc'})
  const [search, setSearch] = useState('')
  
  //sort
  const handleSort = useCallback((key) => {
    setSort((prev) => {
        if(prev.key === key) {
            return {
                key,
                direction: prev.direction === 'asc' ? 'desc' : 'asc'
            }
        }
        return {
            key,
            direction: 'asc'
        }
    })
  }, [])

  //proccesed data
  const proccesedData = useMemo(() => {
    //filter
    let result = [...data]

    if(search) {
        const query = search.toLowerCase()
        result = result.filter(item => item.name.toLowerCase().includes(query))
    }

    //sort
    const {key, direction} = sort;
    if(key) {
        result.sort((a,b) => compare(a[key], b[key], direction))
    }

    return result
  },[sort, data, search, compare])

  //pagination
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return proccesedData.slice(start, start + PAGE_SIZE)
  }, [proccesedData, page])

  const totalPages = useMemo(() => {
    return Math.max(Math.ceil(proccesedData.length / PAGE_SIZE), 1)
  }, [proccesedData.length])

  // Si filtro u orden cambian el total de filas, evitar quedar en una página vacía
  useEffect(() => {
    setPage((current) => (current > totalPages ? totalPages : current))
  }, [totalPages])

  return {
    page,
    setPage,
    paginatedData,
    totalPages,
    sort,
    handleSort,
    search,
    setSearch,
  }
}

export default useTable
