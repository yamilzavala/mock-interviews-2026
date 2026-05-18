import React, {useState, useEffect, useRef} from 'react'
import useDebounce from './useDebounce'

const paginationInitialValues = {
    hasMore: false,
    nextCursor: null
}

const useFetchData = (url, filters) => {
  // states
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState(paginationInitialValues)
  
  // refs
  const abortRef = useRef(null)
  const cacheRef = useRef(new Map())

  // serialization filters
  const serializedFilters = JSON.stringify(filters)

  // debounde
  const deboundedValue = useDebounce(serializedFilters, 500)

  // effect + validation border + cache + abort + fetch
  useEffect(() => {
    const filtersParsed = JSON.parse(deboundedValue);

    const fetchData = async () => {
        // validation
        if(!filtersParsed?.search || !filtersParsed?.search.trim()) {
            setData([])
            setPagination(paginationInitialValues)
            return;
        }

        // cache
        if (cacheRef.current.has(deboundedValue)) {
            const cached = cacheRef.current.get(deboundedValue)

            setData(prev =>
                filtersParsed.cursor ? [...prev, ...cached.data] : cached.data
            )

            setPagination(cached.pagination)
            return
        }

        // abort
        if(abortRef.current) {
            abortRef.current.abort()
        }
        const controller = new AbortController()
        abortRef.current = controller;

        try {
            setLoading(true)
            setError(null)
            
            const params = new URLSearchParams(filtersParsed).toString()

            const resp = await fetch(
                `${url}?${params}`,
                {signal: controller.signal}
            )

            if(!resp.ok) {
                throw new Error('Something weng wrong')
            }

            const jsonData = await resp.json()

            // cache save
            cacheRef.current.set(deboundedValue, jsonData)

            setData((prev) => {
                const newData = [...prev, ...jsonData.data]
                return newData
            })
            setPagination(jsonData.pagination)

        } catch (error) {
            if(error.name !== 'AbortError') {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    fetchData()
  }, [url, deboundedValue])


  return {
    loading,
    error,
    data,
    pagination
  }
}

export default useFetchData