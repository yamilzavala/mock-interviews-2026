🧠 PATRÓN REAL — TWO POINTERS (template mental)

👉 Este es el equivalente al que ya conocés de sliding window:

let left = 0;
let right = arr.length - 1;

while (left < right) {
  const value = evaluar(arr[left], arr[right]);

  if (value === objetivo) {
    // encontré resultado
    return resultado;
  }

  if (value < objetivo) {
    left++;   // necesito un valor mayor
  } else {
    right--;  // necesito un valor menor
  }
}

🔥 LA IDEA CLAVE (esto es lo importante)

👉 Siempre estás tomando decisiones con dos extremos

Y la regla es:

mover el puntero que te acerque al objetivo

⚡ VARIANTE 1 — Buscar un target (la más común)

Ej: two sum en array ordenado

while (left < right) {
  const sum = arr[left] + arr[right];

  if (sum === target) {
    return [left, right];
  }

  if (sum < target) {
    left++;
  } else {
    right--;
  }
}

👉 Este es EL patrón que más te van a pedir.

⚡ VARIANTE 2 — Minimizar / maximizar diferencia

Ej: closest sum

while (left < right) {
  const sum = arr[left] + arr[right];

  // actualizar mejor resultado SIEMPRE
  updateBest(sum);

  if (sum < target) {
    left++;
  } else {
    right--;
  }
}

👉 Acá NO cortás, seguís buscando mejor resultado

⚡ VARIANTE 3 — Filtrar / reordenar (in-place)

Ej: mover ceros, separar pares/impares

while (left < right) {
  if (condiciónIzquierda) {
    left++;
  } else if (condiciónDerecha) {
    right--;
  } else {
    swap(arr[left], arr[right]);
  }
}

👉 Acá no hay target, hay reglas de orden