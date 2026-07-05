import React, {useState, useEffect, useRef} from 'react'
import useDebounce from './useDebounce'

const useFetchData = (url, params) => {
  // states
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState(null)

  // debounced + serialization
  const serializedParams = JSON.stringify(params)
  const debouncedValue = useDebounce(serializedParams, 500)

  //refs: cache & abortController
  const abortRef = useRef(null)
  const cacheRef = useRef(new Map())
  
  //effect + fetchData + abortControler (race conditions) + cache  
  useEffect(() => {
    const fetchData = async () => {
        // cache hit
        if (cacheRef.current.has(debouncedValue)) {
            const cached = cacheRef.current.get(debouncedValue)
            setData(cached.data)
            setPagination(cached.pagination)
            return
        }

        // abort
        if(abortRef.current) {
            abortRef.current.abort()
        }

        const controller = new AbortController()
        abortRef.current = controller;

        // cache
        try {
            setLoading(true)
            setError(null)
            
            const parsedParams = JSON.parse(debouncedValue);
            const queryString = new URLSearchParams(parsedParams).toString();
            const resp = await fetch(
                `${url}?${queryString}`,
                {signal: controller.signal}
            )

            if(!resp.ok) {
                throw new Error('Something went wrong')
            }

            const jsonData = await resp.json()

            // save cache
            cacheRef.current.set(debouncedValue, jsonData)

            setData(jsonData.data)
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
  }, [url, debouncedValue])
  
  return {
    loading,
    error,
    pagination,
    data
  }
}

export default useFetchData