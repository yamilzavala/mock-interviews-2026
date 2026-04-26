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

“I would separate concerns by keeping the UI component simple and moving all data fetching logic into a custom hook.

The component would manage the query state, while the hook would handle loading, error and results state.

I would debounce the query to avoid unnecessary requests, and cache results by query using a Map stored in a ref to instantly return previous results.

To handle race conditions, I would cancel previous requests using AbortController and ensure only the latest request updates the UI.

I would also handle empty results and reset the state when the query is empty to improve user experience.”