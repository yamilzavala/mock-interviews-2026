🧪 PARTE 1 — React (nivel alto real)
🧩 Enunciado
👉 DebouncedSearchWithCache
Requisitos

Tenés que construir un componente que:
1️⃣ Input de búsqueda
el usuario escribe texto
debounce de 300ms

2️⃣ Fetch de resultados
Simular o usar API:
https://jsonplaceholder.typicode.com/users?name_like={query}

3️⃣ Cache
👉 Si el usuario repite una búsqueda:
NO hacer request otra vez
usar cache

4️⃣ Estados
loading
error
results

🧠 Condiciones importantes
evitar race conditions
evitar requests innecesarios
no mutar estado
UX fluida

⭐ Bonus
cancelar requests previos
optimizar renders

🎤 Pregunta 1
👉 explicame:
qué estado usarías
cómo implementarías debounce
cómo implementarías cache
cómo evitarías race conditions
cómo estructurarías el componente


-----------------------------------
💯 Versión ideal (nivel top)

I would use state for query, results, loading, and error.

For debounce, I would use a custom hook that delays the query value.

For caching, I would use a useRef with a Map to store previous results and avoid unnecessary re-renders.

Before making a request, I would check the cache and return cached data if available.

To avoid race conditions, I would use an AbortController stored in a ref to cancel previous requests.

I would also ensure that only the latest request updates the state.

The fetch logic would be encapsulated in a memoized function, and triggered inside a useEffect based on the debounced query.

If the query is empty, I would clear the results.

Structurally, I would keep the component simple and handle async logic in dedicated functions or hooks.