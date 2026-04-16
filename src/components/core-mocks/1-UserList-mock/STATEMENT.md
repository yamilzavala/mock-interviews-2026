🧪 PARTE 1 — React práctico (principal)
🧩 Enunciado

Tenés que construir un componente:
👉 UserList
Requisitos:
Consumir esta API:
https://jsonplaceholder.typicode.com/users
Mostrar una lista de usuarios (name + email)
Agregar:
🔍 input de búsqueda (filtra por nombre)
⏳ loading state
❌ error state
Bonus (si llegás):
debounce en el search
🎤 Lo que quiero ver

Antes de codear, respondeme:
❓ Pregunta 1

¿Cómo encararías este problema?
qué estados necesitás
qué hooks usarías
cómo estructurarías el componente

-----------------------------------------------------------------

💯 Respuesta ideal (nivel senior)

Algo así:

I would create a UserList component with four states: users, loading, error, and search.

I would fetch the data inside a useEffect and update users, loading, and error accordingly.

For the search functionality, I would store the search input in state and derive a filtered list from users instead of mutating the original data.

Then I would map the filtered users and render them using a child component.

I would also handle loading and error states conditionally in the UI.