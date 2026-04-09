import React, {useState, useEffect, useRef} from 'react'
import useDebounce from './useDebounce'

export const useAutocomplete = (value, fn) => {
  const {debouncedValue} = useDebounce(value, 500)

  const [result, setResult] = useState([])
  const [loading, setLoading] = useState(false);

  const abortRef = useRef(null);

  useEffect(() => {
    if(!debouncedValue) {
        setResult([])
        return;
    }

    if(abortRef.current) {
        abortRef.current.abort()
    }

    const controller = new AbortController()
    abortRef.current = controller;

    const fetchData = async () => {
        try {
            setLoading(true)
            const data = await fn(debouncedValue, constroller.signal)
            setResult(data)
        } catch (error) {
            console.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    fetchData()

    return () => controller.abort()
  }, [debouncedValue, fn])


  return (
    {
        result, 
        loading
    }
  )
}
