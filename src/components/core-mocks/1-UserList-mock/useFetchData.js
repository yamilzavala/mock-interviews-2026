import React, {useEffect, useState, useRef} from 'react'
import useDebounce from './useDebounce'

const useFetchData = (query, url) => {
  // states
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // useDebounce
  const debouncedValue = useDebounce(query, 500)

  // refs abort & cache(Map)
  const abortRef = useRef(null)
  const cacheRef = useRef(new Map())

  //effect + fetchData + abortControler (race conditions) + cache
  useEffect(() => {
    const fetchData = async () => {
        //query validation
        if(!debouncedValue?.trim()){
            setData([])
            return;
        }
        
        // cache
        if(cacheRef.current.has(debouncedValue)){
            setData(cacheRef.current.get(debouncedValue))
            return;
        }
    
        // abort controller
        if(abortRef.current) {
            abortRef.current.abort()
        }

        const controller = new AbortController()
        abortRef.current = controller;
    
        try {
            setLoading(true)
            setError(null)
            const resp = await fetch(
                `${url}?name_like=${debouncedValue}`,
                {signal: controller.signal}
            )

            if(!resp.ok) {
                throw new Error('Something went wrong')
            }

            const data = await resp.json()

            // cache save
            cacheRef.current.set(debouncedValue, data)

            setData(data)
        } catch (error) {
            if(error.name !== 'AbortError') {
                setError(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    fetchData()

  }, [debouncedValue, url])

  return {
    loading, 
    error,
    data
  }
}

export default useFetchData