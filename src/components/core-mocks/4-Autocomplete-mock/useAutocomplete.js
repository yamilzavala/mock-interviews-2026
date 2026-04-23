import React, {useEffect, useRef, useState} from 'react'
import useDebounce from './useDebounce'

const useAutocomplete = (fn, query) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const { debouncedValue } = useDebounce(query, 500)

  const controllerRef = useRef(null)

  useEffect(() => {
    if(!debouncedValue) {
      setResults([])
      return;
    }

    //controller
    if(controllerRef.current) controllerRef.current.abort()

    const controller = new AbortController()
    controllerRef.current = controller;

    const fetchData = async () => {
      try {
        setLoading(true)
        const data = await fn(debouncedValue, controller.signal)
        setResults(data)
      } catch (error) {
        if(error.name !== 'AbortError') {
          console.log('Something went wrong')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [fn, debouncedValue])
  
  return {
    results,
    loading
  }
}

export default useAutocomplete