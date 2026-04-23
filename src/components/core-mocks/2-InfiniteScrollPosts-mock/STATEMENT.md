🧩 Enunciado
👉 Optimized Infinite List (con filtro + scroll)

Requisitos
Tenés que construir:
lista de items (pueden ser 1000+)
filtro por texto
infinite scroll
evitar lag

⚠️ Problemas reales
👉 El entrevistador te dice:
“When I scroll fast, performance drops and I see duplicate items sometimes.”

🎤 Pregunta 1 (como entrevistador)
👉 Explicame:
qué podría estar causando ese problema
cómo lo diagnosticarías
cómo lo solucionarías

⚠️ FOLLOW-UP (te interrumpo)
“You said performance issues… how exactly would you prevent unnecessary renders?”

⚠️ FOLLOW-UP 2
“What if the API returns duplicated items?”

-------------------------------------------------

🎤 Senior Explanation (Virtualized Infinite List)

“To solve this problem, I approached it by separating performance concerns from data consistency and request management.

First, for performance, since the list can grow to hundreds or thousands of items, I used list virtualization with react-window. This ensures that only the visible items are rendered in the DOM, which significantly reduces rendering cost and avoids UI lag when scrolling fast.

When using virtualization, one important consideration is that not all items are mounted in the DOM at the same time. Because of that, I cannot rely on techniques like observing the last DOM element with IntersectionObserver.

Instead, I use the onItemsRendered callback provided by react-window. This gives me access to the visible index range, and I trigger the next data fetch when the user scrolls close to the end of the list, for example when the visible stop index is near the total number of items.

For data fetching, I implemented a request lock using a ref to prevent multiple concurrent requests when the user scrolls quickly. This avoids duplicated API calls and race conditions.

Additionally, I handle pagination using a ref instead of state, so I can increment the page without causing unnecessary re-renders.

To ensure data consistency, I always deduplicate the items on the client side using a Map keyed by a unique identifier, such as the item id. This guarantees that even if the API returns overlapping data or duplicate responses occur, the UI remains consistent.

Overall, this approach ensures smooth scrolling performance, prevents duplicate data, and handles large datasets efficiently.”