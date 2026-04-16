🧠 PATRÓN REAL — MERGE INTERVALS (Sorting + Greedy)
👉 Este es el equivalente al de sliding window / two pointers:

// 1. Ordenar por start
intervals.sort((a, b) => a[0] - b[0]);

const result = [];
let current = intervals[0];

for (let i = 1; i < intervals.length; i++) {
  const next = intervals[i];

  // 2. Si se solapan → merge
  if (next[0] <= current[1]) {
    current[1] = Math.max(current[1], next[1]);
  } else {
    // 3. Si NO se solapan → guardo y avanzo
    result.push(current);
    current = next;
  }
}

// 4. No te olvides del último
result.push(current);

return result;


🧠 Forma mental (esto es lo importante)
👉 Pensalo así:
1. Ordeno
2. Empiezo con un intervalo "activo"
3. Recorro:
   - Si overlap → agrando el activo
   - Si no → guardo el activo y cambio al siguiente
4. Al final → guardo el último


🔥 Regla clave (tenés que memorizar esto)
👉 Condición de overlap:
next.start <= current.end

👉 Cómo mergear:
current.end = Math.max(current.end, next.end)


-----------------------------------------------

🧠 Primero: entendé el problema (clave en entrevista)
Tenés intervalos:
[1,3]   [2,6]

👉 Pregunta clave:
¿Cuándo dos intervalos se “pisan” (overlap)?

Pensalo así:
👉 Un intervalo A [startA, endA] se superpone con B [startB, endB] si:

startB <= endA

💡 Esa es la condición que tenés que detectar SIEMPRE.

🔥 Paso 1 — Insight importante
Antes de pensar en código, respondé esto:
👉 ¿Qué pasa si los intervalos están desordenados?

Ejemplo:
[8,10], [1,3], [2,6]

👉 ¿Podés mergear correctamente sin ordenarlos?
❌ No.
Porque no sabés cuál comparar primero.

💡 Entonces:
👉 Primer paso mental (patrón):
Ordenar por start

🧠 Patrón que estás usando
Esto es un mix de:
👉 Sorting + Greedy
Sorting → te da orden lógico
Greedy → vas tomando decisiones locales óptimas (merge o no)

Si todos los intervalos se solapan,
solo hay 1 push (el final)

✔ Overlap → merge (NO push)
✔ No overlap → push current
✔ Final → push last interval