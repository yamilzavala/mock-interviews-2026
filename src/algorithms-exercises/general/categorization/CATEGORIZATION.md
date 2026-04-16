🧠 TEMPLATE GENERAL (esto es oro para entrevistas)

Memorizá esto:

function groupByPattern(arr) {
  const map = new Map();

  for (const item of arr) {
    // 1. generar key (normalización)
    const key = normalize(item);

    // 2. inicializar si no existe
    if (!map.has(key)) {
      map.set(key, []);
    }

    // 3. agrupar
    map.get(key).push(item);
  }

  // 4. devolver resultado
  return Array.from(map.values());
}


🧠 TEMPLATE específico para strings (anagramas)
function normalize(word) {
  const freq = new Array(26).fill(0);

  for (const char of word) {
    freq[char.charCodeAt(0) - 97]++;
  }

  return freq.join('#');
}


------------

