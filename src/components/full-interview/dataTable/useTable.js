import { useState, useEffect, useCallback, useRef } from 'react'
import useDebounce from './useDebounce'

const PAGE_SIZE = 5
const BASE_URL = 'http://localhost:3000/api/table'

const useTable = () => {
  const [data, setData] = useState([])
  const [cursor, setCursor] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState({ key: 'id', direction: 'asc' })

  const debouncedSearch = useDebounce(search, 500)

  const abortRef = useRef(null)

  // 🔥 reset
  const reset = useCallback(() => {
    setData([])
    setCursor(null)
    setHasMore(true)
  }, [])

  // 🔀 sort handler
  const handleSort = useCallback((key) => {
    setSort(prev => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        }
      }
      return { key, direction: 'asc' }
    })

    reset()
  }, [reset])

  // 🔎 search handler
  const handleSearch = useCallback((value) => {
    setSearch(value)
    reset()
  }, [reset])

  // 🚀 fetch data
  const fetchData = useCallback(async () => {
    try {
      // cancel previous request
      if (abortRef.current) {
        abortRef.current.abort()
      }

      const controller = new AbortController()
      abortRef.current = controller

      const params = new URLSearchParams({
        search: debouncedSearch,
        sortKey: sort.key,
        sortDir: sort.direction,
        cursor: cursor || '',
        limit: PAGE_SIZE
      })

      const res = await fetch(`${BASE_URL}?${params}`, {
        signal: controller.signal
      })

      const json = await res.json()

      setData(prev => [...prev, ...json.data])
      setCursor(json.pagination.nextCursor)
      setHasMore(json.pagination.hasMore)

    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error(err)
      }
    }
  }, [search, sort, cursor])

  // 🔥 auto fetch cuando cambia search o sort
  useEffect(() => {
    fetchData()
  }, [debouncedSearch, sort])

  return {
    data,
    fetchData,
    hasMore,
    search,
    handleSearch,
    sort,
    handleSort
  }
}

export default useTable