// Ejemplo
// Input: nums = [1,2,1,2,3], k = 2
// Output: 4  // [1,2,1,2]

// Expandís con right
// Agregás al map
// Si map.size > k:
// movés left
// restás frecuencia
// si queda en 0 → delete
// En cada paso válido:
// calculás right - left + 1
// guardás el máximo


// 👉 right → expande
// 👉 left → contrae
// 👉 map → controla cuántos distintos hay
// 👉 while → corrige cuando te pasás

// 👉 No alcanza con un Set porque:
// no guarda frecuencias
// no permite saber si un elemento todavía existe en la ventana
// al mover left, podrías eliminar un valor que aún está presente
// eso rompe la representación correcta de la ventana

// 👉 Por eso se necesita un Map con conteo de frecuencias

const maxSubArrK = (arr, k) => {
  let left = 0;
  let max = 0;
  const map = new Map();

  for (let right = 0; right < arr.length; right++) {
    const currVal = arr[right];
    map.set(currVal, (map.get(currVal) || 0) + 1);

    while (map.size > k) {
      const leftVal = arr[left];
      map.set(leftVal, map.get(leftVal) - 1);
      if (map.get(leftVal) === 0) {
        map.delete(leftVal);
      }
      left++;
    }

    if (map.size === k) {
      max = Math.max(max, right - left + 1);
    }
  }

  return max;
};