🧪 PARTE 1 — React (nivel alto)
🧩 Enunciado
👉 DataTable
Requisitos
Tenés que construir una tabla que:
1️⃣ Reciba datos por props
[
  { id: 1, name: "John", age: 28 },
  { id: 2, name: "Ana", age: 22 },
  { id: 3, name: "Paul", age: 32 },
  { id: 4, name: "Jack", age: 40 },
  { id: 5, name: "Marie", age: 35 },
  { id: 6, name: "Stefany", age: 56 },
  { id: 7, name: "Angie", age: 33 },
  { id: 8, name: "Luck", age: 19 },
  { id: 9, name: "John", age: 22 },
  { id: 10, name: "Sofie", age: 46 },
]

2️⃣ Funcionalidades
✔ Sorting
click en header → ordenar asc/desc
debe ser genérico (cualquier columna)
✔ Search
filtrar por name
✔ Pagination
5 items por página

3️⃣ Condiciones importantes
no recalcular innecesariamente
no mutar el array original
manejar bien estado derivado
evitar renders innecesarios

⭐ Bonus
memorizar filas (React.memo)
custom hook

🎤 Pregunta 1
👉 explicame:
qué estado usarías
cómo manejarías sorting
cómo combinarías search + pagination
cómo evitarías recalcular todo en cada render
cómo estructurarías el componente

--------------------------------------------------------------

“I would keep minimal state: search, page, sortKey, and sortDirection.

I would derive the displayed data using useMemo to avoid unnecessary recalculations.

The pipeline would be: first filter by search, then sort based on the selected column and direction, and finally paginate using slice.

For sorting, I would toggle between ascending and descending when clicking the same column.

To avoid mutations, I would always work on a copied array.

For performance, I would memoize row components using React.memo and use useCallback for handlers.

I would also extract the data transformation logic into a custom hook to keep the component clean and reusable.”