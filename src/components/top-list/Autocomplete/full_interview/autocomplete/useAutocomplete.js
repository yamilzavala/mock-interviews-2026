import { useEffect, useRef, useState } from 'react'
import useDebounce from './useDebounce'

const useAutocomplete = (query) => {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const debouncedValue = useDebounce(query, 500)

  const controllerRef = useRef(null)

  // cache memory
  const cacheRef = useRef(new Map())

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setResults([])
      return
    }

    // minimum chars
    if (debouncedValue.trim().length < 2) {
      setResults([])
      return
    }

    // cache
    if (cacheRef.current.has(debouncedValue)) {
      setResults(cacheRef.current.get(debouncedValue))
      return
    }

    // cancel previous request
    if (controllerRef.current) {
      controllerRef.current.abort()
    }

    const controller = new AbortController()

    controllerRef.current = controller

    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `http://localhost:3000/api/autocomplete/users?search=${debouncedValue}&limit=5`,
          {
            signal: controller.signal,
          }
        )

        if (!response.ok) {
          throw new Error('Request failed')
        }

        const json = await response.json()

        cacheRef.current.set(debouncedValue, json.data)

        setResults(json.data)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()

    return () => controller.abort()
  }, [debouncedValue])

  return {
    results,
    loading,
    error,
  }
}

export default useAutocomplete