🧪 PARTE 1 — React práctico (nuevo escenario)
🧩 Enunciado

Tenés que construir un componente:

👉 InfiniteScrollPosts

Requisitos
Consumir esta API:
https://jsonplaceholder.typicode.com/posts?_limit=10&_page=1
Funcionalidades
1️⃣ Mostrar posts
title
body
2️⃣ Infinite scroll
cuando el usuario llega al final → cargar más posts
paginar usando _page
3️⃣ Estados
⏳ loading
❌ error
🧠 Condiciones importantes
no duplicar requests
evitar múltiples llamadas simultáneas
append de datos (no reemplazar)
manejar correctamente el “no hay más datos”
⭐ Bonus
usar Intersection Observer en vez de scroll event
optimizar renders
🎤 Pregunta 1

Antes de codear:

👉 explicame:

qué estados usarías
cómo manejarías el infinite scroll
cómo evitarías múltiples requests
cómo estructurarías el componente

-----------------------------------------------------------------

2️⃣ Explicación SENIOR (en inglés)

I would use state for posts, loading, error, page, and hasMore.

To implement infinite scroll, I would use the Intersection Observer API with a ref element at the bottom of the list.

When that element becomes visible, I would trigger a fetch for the next page.

To avoid multiple requests, I would use loading and hasMore flags.

When fetching new data, I would append it to the existing posts using setPosts(prev => [...prev, ...newPosts]).

If the API returns fewer items than expected, I would set hasMore to false to stop further requests.

I would also encapsulate the observer logic in a custom hook to keep the component clean.

Esto es lo que dirías en una entrevista 👇

✅ States

I would manage the following states:

posts: to store the accumulated list of posts
page: to control pagination
loading: to prevent concurrent requests and show UI feedback
error: to handle API failures
hasMore: to determine when there are no more results to fetch
✅ Infinite Scroll Strategy

I would use the Intersection Observer API to detect when the user reaches the bottom of the list.

Specifically, I would place a sentinel element at the end of the list and trigger a new fetch whenever that element becomes visible.

✅ Avoid Multiple Requests

To prevent multiple or duplicated requests:

I would guard the fetch with a loading flag
I would also check hasMore before triggering new requests
Additionally, I would ensure the observer callback is stable using useCallback to avoid unnecessary re-instantiations
✅ Component Structure

I would split the logic into:

A main component responsible for state management and rendering
A reusable hook (e.g. useInfiniteScroll) to encapsulate observer logic

This keeps the component clean and improves reusability and testability.

