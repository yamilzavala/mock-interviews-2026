import { useState, useEffect, useRef, useCallback } from "react";
import useDebounce from "./useDebounce";


export default function DebouncedSearchWithCache() {
  const [query, setQuery] = useState("");
  const {debouncedValue} = useDebounce(query, 300);

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 cache persistente (NO re-render)
  const cacheRef = useRef(new Map());

  // 🔥 abort controller para cancelar requests
  const abortRef = useRef(null);

  /**
   * 🔹 fetch function (memoizada)
   */
  const fetchUsers = useCallback(async (search) => {
    // evitar queries vacíos
    if (!search?.trim()) {
      setResults([]);
      return;
    }

    // 🔥 check cache
    if (cacheRef.current.has(search)) {
      setResults(cacheRef.current.get(search));
      return;
    }

    // 🔥 cancelar request anterior
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?name_like=${search}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Error fetching users");
      }

      const data = await response.json();

      // 🔥 guardar en cache
      cacheRef.current.set(search, data);

      setResults(data);
    } catch (err) {
      // ignorar abort errors (esperado)
      if (err.name === "AbortError") return;

      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 🔹 effect principal
   */
  useEffect(() => {
    fetchUsers(debouncedValue);
  }, [debouncedValue, fetchUsers]);

  /**
   * 🔹 handler input
   */
  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  /**
   * 🔹 render
   */
  return (
    <div style={{ padding: 20 }}>
      <h2>Debounced Search With Cache</h2>

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search users..."
        style={{ padding: 8, width: 300 }}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}