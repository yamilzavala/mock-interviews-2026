🧠 TEMPLATE MENTAL — SUBSETS (ITERATIVO)
👉 Este es el patrón único:
result = [[]]

for cada elemento num en nums:
    tamaño_actual = result.length

    for i desde 0 hasta tamaño_actual:
        nuevo_subset = copia de result[i] + num
        agregar nuevo_subset a result
🔥 Traducción directa a código
const result = [[]];

for (const num of nums) {
  const size = result.length;

  for (let i = 0; i < size; i++) {
    result.push([...result[i], num]);
  }
}

🧠 Cómo pensarlo (lo importante)
👉 “Por cada número, duplico todos los subsets existentes y les agrego ese número”

⚠️ REGLA CRÍTICA (la que te hace senior)
👉 Siempre trabajás sobre:
size = result.length

👉 Nunca sobre result.length dinámico