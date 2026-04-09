import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { FixedSizeList as List } from "react-window";

/**
 * 🔥 Hook debounce
 */
const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        return () => clearTimeout(timeout)
    }, [delay, value])

    return debouncedValue
}

const API = "https://jsonplaceholder.typicode.com/posts";

/**
 * 🔥 Componente principal
 */
export default function VirtualizedInfiniteList() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState([]);

  const debouncedValue = useDebounce(query, 300);
  const abortRef = useRef(null)
  const isFeachingRef = useRef(false)
  const currPage = useRef(1)

  /**
   * 🔥 Fetch robusto
   */
  const fetchData = useCallback(async () => {
    if(!hasMore || isFeachingRef.current) return;

    //abort
    if(abortRef.current) {
        abortRef.current.abort()
    }

    //nueva instancia
    abortRef.current = new AbortController()

    try {
        setError(null)
        const resp = await fetch(`${API}?q=${debouncedValue}&_limit=10&_page=${currPage.current}`)
        
        if(!resp.ok) {
            throw new Error('Something went wrong')
        }
        
        const data = await resp.json()

        // 🔥 deduplicación defensiva
        setItems((prev) => {
            const map = new Map();
            [...prev, ...data].forEach(item => map.set(item.id, item))
            return Array.from(map.values())
        })

        // 🔥 control paginación
        if(data.length < 1) {
            setHasMore(false)
        } else {
            currPage.current += 1;
        }
    } catch (error) {
        if(error.title === 'AbortError') return;
        setError(error.message)
    } finally {
        isFeachingRef.current = false;
    }
  }, [debouncedValue, hasMore])

  /**
   * 🔥 Reset cuando cambia búsqueda
   */
  useEffect(() => {
    currPage.current = 1;
    setItems([])
    setHasMore(true)
  }, [debouncedValue])

  /**
   * 🔥 Fetch inicial / cambio de query
   */
  useEffect(() => {
    fetchData()
  }, [fetchData])

  /**
   * 🔥 Infinite scroll con virtualización
   */
  const handleItemsRendered = useCallback(({visibleStopIndex}) => {
    if(visibleStopIndex >= items.length - 2) {
        fetchData()
    }
  }, [items.length, fetchData])

  /**
   * 🔥 Row memoizado (evita re-renders innecesarios)
   */
  const Row = useCallback(({index, style}) => {
    const item = items[index]
    return (
        <div style={style}>
            <h4>{item.id}</h4>
            <p>{item.title}</p>
        </div>
    )
  }, [items])

  /**
   * 🔥 Memo de lista (extra defensivo)
   */


  return (
    <div>
      {/* 🔥 SEARCH */}
      <input
        type="text"
        value={isFeachingRef.current ? 'loading...' : query}
        onChange={e => setQuery(e.target.value)}
        disabled={isFeachingRef.current}
        placeholder="search..."
        style={{marginBottom: 10, width: '100%'}}
      />

      {/* 🔥 ERR */}
      {error && <p>Error: {error}</p>}

      {/* 🔥 LISTA VIRTUALIZADA */}
      <List
        height={500}
        width={"100%"}
        itemCount={items.length}
        itemSize={150}
        onItemsRendered={handleItemsRendered}
      >
        {Row}
      </List>

      {/* 🔥 HAS MORE */}
      {!hasMore && <p>No more data</p> }
    </div>
  );
}