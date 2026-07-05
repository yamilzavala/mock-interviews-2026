🎤 ROUND 6 — FULL INTERVIEW
👉 Dashboard de usuarios

Tenés que construir:
tabla de usuarios
búsqueda por nombre
filtro por rol
paginación
refresh de datos

🎯 Requerimientos
fetch API /users
query params: search, role, page
loading / error
mantener UI consistente

🎤 Parte 1 — React (principal)
Pregunta 1
👉 How would you design this component?

Quiero que hables de:
estructura de componentes
estado
manejo de filtros + paginación
flujo de datos


-----------------------------------------------

🎤 FRONTEND (Justification)

On the frontend, I would design the solution as a thin and scalable UI layer that is responsible for managing user interactions and delegating heavy operations to the backend.

I would split the UI into small, reusable components such as a container page, filters (search and role), a table, and pagination controls. This keeps the structure clean and maintainable as the application grows.

For state management, I would separate UI state from server state. UI state would include search, role, and page, while server state would include the users data, loading, and error states. This separation helps keep the logic predictable and easier to debug.

To handle user input efficiently, I would debounce the search input to avoid triggering unnecessary API calls on every keystroke. I would also use an AbortController to cancel in-flight requests, preventing race conditions and ensuring that only the latest request updates the UI.

Additionally, I would introduce a simple caching strategy using a Map to store previous responses based on the query parameters. This improves performance and reduces redundant network calls for repeated queries.

From a data flow perspective, the flow would be: user interaction updates filters, filters trigger a debounced fetch, and the response updates the UI. This ensures consistency and avoids unnecessary re-renders.

Finally, I would avoid doing filtering, sorting, or pagination on the frontend. Instead, I would rely on the backend to handle those concerns, ensuring that the frontend remains performant even with large datasets.

------------------------- version corta ----------------------------

🎤 🎯 1-MINUTE ANSWER

Frontend:

On the frontend, I would design a thin UI layer that manages user interactions and delegates heavy logic to the backend. I would split the UI into reusable components like filters, table, and pagination.

For state, I would separate UI state such as search, role, and page from server state like data, loading, and error. I would debounce the search input to avoid excessive API calls and use an AbortController to prevent race conditions.

The data flow would be simple: user updates filters, that triggers a debounced API call, and the response updates the UI. I would also add a small cache using a Map to avoid repeated requests for the same query.