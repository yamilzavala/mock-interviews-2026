import React, {useState, useCallback, useRef, useEffect} from 'react'
import useDebounce from './useDebounce'
import {FixedSizeList as List} from 'react-window'
import Row from './Row'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const InfiniteScroll = () => {
  // states
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [hasMore, setHasMore] = useState(true)

  // refs
  const abortRef = useRef(null);
  const pageRef = useRef(1)
  const loadingRef = useRef(false)

  const debouncedValue = useDebounce(query, 500)

  // fetch
  const fetchData = useCallback(async () => {
    if(!hasMore || loadingRef.current) return;

    // abort controller
    if(abortRef.current) {
        abortRef.current.abort()
    }

    const controller = new AbortController()
    abortRef.current = controller;

    // fetch
    try {
        loadingRef.current = true;
        setError(null);

        const resp = await fetch(
            `${BASE_URL}?q=${debouncedValue}&_page=${pageRef.current}`,
            {signal: controller.signal}
        )

        if(!resp.ok) {
            throw new Error('Something went wrong')
        }

        const data = await resp.json()

        //deduplicates
        setItems((prev) => {
            const map = new Map();
            [...prev, ...data].forEach(item => map.set(item.id, item))
            return Array.from(map.values())
        })

        //pagination
        if(data.length < 1) {
            setHasMore(false)
        } else {
            pageRef.current += 1;
        }
    } catch (error) {
        if(error.name !== 'AbortError') {
            setError(error.message)
        }
    } finally {
        loadingRef.current = false;
    }
  }, [hasMore, debouncedValue])

  // effects
  useEffect(() => {
    pageRef.current = 1;
    setItems([])
    setHasMore(true)
  }, [debouncedValue])

  useEffect(() => {
    fetchData()
  }, [fetchData])


  // handler onItemsRendered
  const handleOnItemsRendered = useCallback(({visibleStopIndex}) => {
    if(visibleStopIndex >= items.length -2) {
        fetchData()
    }
  }, [fetchData, items.length])

  return (
    <div>
        {/* input */}
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={loadingRef.current ? 'loading...' : 'search'}
          disabled={loadingRef.current}
          style={{marginBottom: '10px', width: '100%'}}
        />

        {/* list */}
        <List
         height={500}
         itemSize={220}
         width={'100%'}
         itemCount={items.length}
         itemData={items}
         onItemsRendered={handleOnItemsRendered}
        >
            {Row}
        </List>

        {error && <p>Error: {error}</p>}

        {!hasMore && <p>No more data</p>}
    </div>
  )
}

export default InfiniteScroll