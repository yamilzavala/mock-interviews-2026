function topKFrequent(arr, k) {
  // 1. contar frecuencias
  const freqMap = new Map();

  for (const x of arr) {
    freqMap.set(x, (freqMap.get(x) || 0) + 1);
  }

  // 2. map → array
  const list = Array.from(freqMap.entries()); 
  // [[num, freq], ...]

  // 3. ordenar por frecuencia DESC
  list.sort((a, b) => b[1] - a[1]);

  // 4. tomar top k + extraer valores
  return list.slice(0, k).map((item) => item[0]);
}

---------------------------------

🧠 TEMPLATE MENTAL (ultra resumido)
// 1. contar → hashmap
// 2. convertir → array
// 3. ordenar → desc por freq
// 4. slice(k) → map a valores


🔥 Cómo explicarlo como senior
👉 Esto es clave para la entrevista:
“First, I build a frequency map in O(n).
Then I convert it into an array and sort it by frequency in descending order.
Finally, I take the first k elements.”
