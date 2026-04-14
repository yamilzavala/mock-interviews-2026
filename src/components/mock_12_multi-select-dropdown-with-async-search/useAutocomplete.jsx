import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";

const TTL = 1000 * 60 * 5;

export function useAutocomplete(query, fetchFn) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const debouncedValue = useDebounce(query, 300)

  // cache
  const cacheRef = useRef(new Map())

  //abort
  const abortRef = useRef(null)

  useEffect(() => {
    if(!debouncedValue) {
      setResults([])
      return
    };

    //cache
    const now = Date.now()
    const cached = cacheRef.current.get(debouncedValue)
    if(cached && (now - cached.timestamp < TTL)) {
      setResults(cached.data)
      return;
    }
    
    //abort
    if(abortRef.current) {
      abortRef.current.abort()
    }
    const controller = new AbortController()
    abortRef.current = controller;


    const fetchData = async () =>  {
      try {
        setLoading(true)
        setError(null)
  
        const data = await fetchFn(debouncedValue, {signal: controller.signal})

        //save cache
        cacheRef.current.set(debouncedValue, {
          data,
          timestamp: Date.now()
        })

        setResults(data)
        
      } catch (error) {
        if(error.name === 'AbortError') return;
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    
    return () => controller.abort()
  }, [fetchFn, debouncedValue])

  return { results, loading, error };
}