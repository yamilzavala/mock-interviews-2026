import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
;
import { DropdownList } from "./DropdownList";
import { useAutocomplete } from "./useAutocomplete";


/**
 * 🔥 fake API
 */
async function fetchUsers(query, {signal}) {
  const resp = await fetch(`https://dummyjson.com/users/search?q=${query}`, {signal})
  const data = await resp.json()
  return data?.users;
}

export default function MultiSelect() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const {results, error, loading} = useAutocomplete(query, fetchUsers)

  const containerRef = useRef(null)

  /**
   * 🔹 seleccionar item (sin duplicados)
   */
  const handleSelectItem = useCallback((item) => {
    setSelected((prev) => {
      if(prev.some(u => u.id === item.id)){
        return prev
      }
      return [...prev, item]
    })
  }, [])


  /**
   * 🔹 remover tag
   */
  const handleRemoveItem = useCallback((id) => {
    setSelected(prev => prev.filter(item => item.id != id))
  }, [])


  /**
   * 🔹 click outside
   */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if(!containerRef.current?.contains(e.target)){
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  

  /**
   * 🔹 abrir dropdown en focus
   */
  const handleFocus = () => {
    setIsOpen(true)
  }
  

  return (
    <div ref={containerRef} style={{ width: 300 }}>
      {/* 🔹 tags */}
      <div style={{display: 'flex', padding: '8px', marginBottom: '5px', flexWrap: 'wrap', gap: '4px'}}>
        {selected?.map(user => {
          return(
            <span key={user.id} style={{padding: '5px', border: '1px solid #ccc', textAlign: 'center', borderRadius: '4px'}}>
              {user?.firstName}
              <button onClick={() => handleRemoveItem(user.id)}>x</button>
            </span>
          )
        })}
      </div>
      

      {/* 🔹 input */}
      <input 
      type="text"
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="search"
      onFocus={handleFocus}
      />
    
      {/* 🔹 dropdown */}
      {isOpen && (
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && results?.length < 1 && <p>No results</p> }

          <DropdownList data={results} onSelect={handleSelectItem}  />
        </div>
      )}

    </div>
  );
}